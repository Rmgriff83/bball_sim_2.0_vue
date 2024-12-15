function compileTeam(team) {
  team.coach.coach_object = JSON.parse(team.coach.coach_object);
  team.players = Object.entries(JSON.parse(team.players));

  let teamOverallRating = 0;
  let teamCount = 0;

  let startersArray = Object.values(JSON.parse(team.meta))[0];
  let teamDefaultStarters = {};

  let compiledPlayers = {};

  team.players.forEach((player) => {
    const playerName = player[1].raw.first_name + " " + player[1].raw.last_name;
    compiledPlayers[playerName] = {};
    //[0] is index
    compiledPlayers[playerName]["id"] = parseInt(player[0]);

    let overallRating = 0;
    let overallMultiplier = 0;

    //offensive attributes
    let overallOffensiveAttributes = {};

    const rawOffensiveAttributes = JSON.parse(
      player[1].raw.offensive_attributes
    );
    const addonOffensiveAttributes = player[1].addons.offensive_attributes;

    for (const rawAttribute in rawOffensiveAttributes) {
      overallOffensiveAttributes[rawAttribute] =
        rawOffensiveAttributes[rawAttribute];

      if (addonOffensiveAttributes[rawAttribute]) {
        overallOffensiveAttributes[rawAttribute] +=
          addonOffensiveAttributes[rawAttribute];
      }

      overallRating += overallOffensiveAttributes[rawAttribute] / 100;
      overallMultiplier += 0.95;
    }

    compiledPlayers[playerName]["offensive_attributes"] =
      overallOffensiveAttributes;

    //defensive attributes
    let overallDefensiveAttributes = {};

    //[0] is index
    const rawDefensiveAttributes = JSON.parse(
      player[1].raw.defensive_attributes
    );
    const addonDefensiveAttributes = player[1].addons.defensive_attributes;

    for (const rawAttribute in rawDefensiveAttributes) {
      overallDefensiveAttributes[rawAttribute] =
        rawDefensiveAttributes[rawAttribute];

      if (addonDefensiveAttributes[rawAttribute]) {
        overallDefensiveAttributes[rawAttribute] +=
          addonDefensiveAttributes[rawAttribute];
      }

      overallRating += overallDefensiveAttributes[rawAttribute] / 100;
      overallMultiplier += 1.05;
    }

    compiledPlayers[playerName]["defensive_attributes"] =
      overallDefensiveAttributes;

    //athletic attributes
    let overallAthleticAttributes = {};

    const rawAthleticAttributes = JSON.parse(player[1].raw.athletic_attributes);
    const addonAthleticAttributes = player[1].addons.athletic_attributes;

    for (const rawAttribute in rawAthleticAttributes) {
      overallAthleticAttributes[rawAttribute] =
        rawAthleticAttributes[rawAttribute];

      if (addonAthleticAttributes[rawAttribute]) {
        overallAthleticAttributes[rawAttribute] +=
          addonAthleticAttributes[rawAttribute];
      }

      overallRating += overallAthleticAttributes[rawAttribute] / 100;
      overallMultiplier += 1.2;
    }

    compiledPlayers[playerName]["athletic_attributes"] =
      overallAthleticAttributes;

    //badges
    let overallBadges = [];

    const rawBadges = JSON.parse(player[1].raw.badges_object);
    const addonBadges = player[1].addons.badges_object;

    Object.values(rawBadges.badges).forEach((badge) => {
      overallBadges.push(badge);
    });

    Object.values(addonBadges.badges).forEach((badge) => {
      if (!overallBadges.includes(badge)) {
        overallBadges.push(badge);
      }
    });

    compiledPlayers[playerName]["badges"] = overallBadges;

    //calculate overall
    compiledPlayers[playerName]["overall"] = Math.floor(
      (overallRating / overallMultiplier) * 100
    );

    //add meta info
    compiledPlayers[playerName]["addon_meta"] = player[1].addons.meta;
    compiledPlayers[playerName]["meta"] = JSON.parse(player[1].raw.info_object);

    //determine if default starter
    if (startersArray.includes(compiledPlayers[playerName]["id"])) {
      const startingIndex = returnPosition(
        startersArray,
        compiledPlayers[playerName]["id"]
      );
      teamDefaultStarters[startingIndex] = compiledPlayers[playerName];
      teamDefaultStarters[startingIndex].name = playerName;
      teamDefaultStarters[startingIndex].starting_position = startingIndex;
    }

    //update team overall
    teamOverallRating += compiledPlayers[playerName]["overall"];
    teamCount += 1;
  });

  let teamOverall = Math.floor(teamOverallRating / teamCount);
  team.overall = teamOverall;

  team.players = compiledPlayers;

  let bench = {};

  Object.entries(compiledPlayers).forEach((player) => {
    if (!startersArray.includes(player[1].id)) {
      bench[player[0]] = player[1];
      bench[player[0]].name = player[0];
    }
  });

  team.bench = bench;
  team.meta = JSON.parse(team.meta);
  team.starters = teamDefaultStarters;

  return team;
}

function returnPosition(startersArray, playerID) {
  const startingIndex = startersArray.indexOf(playerID);

  switch (startingIndex) {
    case 0:
      return 0;
      break;
    case 1:
      return 1;
      break;
    case 2:
      return 2;
      break;
    case 3:
      return 3;
      break;
    case 4:
      return 4;
      break;
  }
}

export default compileTeam;
