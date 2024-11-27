let allPlayers = [
  {
    name: "Selicius Achoowa",
    age: 25,
    image: "",
    team: "NY Knocks",
    school: "Memphis",
    country: "Nigeria",
    years_pro: 5,
    contract_yrs_total: 2,
    contract_yrs_left: 2,
    salary: 6000000,
    draft: {
      drafted: true,
      draft_year: 2020,
      draft_round: 1,
      draft_position: 20,
    },
    positions: [3, 4],
    statuses: ["healthy"],
    personalities: [],
    attributes: {
      offensive: {
        handle: 49,
        shot_outside: 67, //3pt
        shot_medium: 60,
        shot_inside: 66,
        free_throw: 61,
        draw_foul: 66,
        post: 57,
        hands: 75,
        pass: 44,
        rebound: 85,
        awareness: 60,
      },
      defensive: {
        interior: 78,
        perimeter: 55,
        steal: 43,
        block: 78,
        help: 80,
        rebound: 77,
        awareness: 1,
      },
      athletic: {
        height: "6-8",
        weight: 225,
        wingspan: "7-1",
        speed: 63,
        agility: 70,
        strength: 79,
        vertical: 78,
        stamina: 80,
        durability: 77,
      },
      intagibles: {
        hustle: 90,
        clutch: 33,
        creativity: 24,
        potential: 74,
      },
      badges: [
        {
          type: "Pogo Stick",
          level: "gold",
        },
        {
          type: "Rebound Chaser",
          level: "silver",
        },
        {
          type: "Boxout Beast",
          level: "bronze",
        },
        {
          type: "Paint Prodigy",
          level: "bronze",
        },
        {
          type: "Physical Finisher",
          level: "bronze",
        },
      ],
    },
  },
];

export default allPlayers;
