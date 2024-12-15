import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";

import compileTeam from "./resources/compileTeam";

export const user = defineStore("user", () => {
  let root = "http://127.0.0.1:8000";
  const router = useRouter();

  const loading = ref(false);

  const allTeams = ref(null);

  const user = ref(null);
  const userCampaigns = ref(null);
  const activeCampaign = ref(null);
  const userTeam = ref(null);
  const userStarters = ref(null);

  function reset() {
    allTeams.value = null;
    user.value = null;
    userCampaigns.value = null;
    activeCampaign.value = null;
    userTeam.value = null;
  }

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function eraseCookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  async function createUser(firstName, lastName, email, password) {
    loading.value = true;

    const userObject = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    await axios.post(root + "/api/create_user", userObject).then((res) => {
      if (res.data.success) {
        console.log("success!", res.data);

        //set bearer token for future requests
        axios.defaults.headers.common = {
          Authorization: `Bearer ${res.data.token.plainTextToken}`,
        };

        setCookie("bball_sim_2.0_auth", res.data.token.plainTextToken, 7);

        user.value = res.data.user;
        loading.value = false;
        router.push({ path: "/mode-select" });
      } else {
        console.log("failure..", res.data);
        loading.value = false;
      }
    });
  }

  async function login(email, password) {
    loading.value = true;

    const userObject = {
      email: email,
      password: password,
    };

    await axios.post(root + "/api/login", userObject).then((res) => {
      if (res.data.success) {
        console.log("success!", res.data);

        //set bearer token for future requests
        axios.defaults.headers.common = {
          Authorization: `Bearer ${res.data.token.plainTextToken}`,
        };

        setCookie("bball_sim_2.0_auth", res.data.token.plainTextToken, 7);

        user.value = res.data.user;
        loading.value = false;
        router.push({ path: "/campaign-select" });
      } else {
        console.log("failure..", res.data);
        loading.value = false;
      }
    });
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  async function checkUser() {
    await axios.get(root + "/api/check").then((res) => {
      if (res.data.success) {
        console.log("success", res.data);
        user.value = res.data.user;
      } else {
        console.log("failure..", res.data);
        user.value = null;
      }
    });
  }

  async function logout() {
    await axios.post(root + "/api/logout").then((res) => {
      eraseCookie("bball_sim_2.0_auth");
      if (res.data.success) {
        console.log("success", res.data);
        reset();
        clearActiveCampaign();
        router.push({ path: "/login" });
      } else {
        console.log("failure..", res.data);
      }
    });
  }

  async function createCampaign() {
    await axios.post(root + "/api/create_campaign").then((res) => {
      if (res.data.success) {
        console.log("success", res.data);
        activeCampaign.value = res.data.campaign.id;

        if (!getCookie("bball_sim_2.0_active_campaign")) {
          setCookie("bball_sim_2.0_active_campaign", activeCampaign.value, 7);
        }

        router.push({ path: "/team-select" });
      } else {
        console.log("failure..", res.data);
      }
    });
  }

  function setActiveCampaign(campaign_id) {
    activeCampaign.value = campaign_id;

    if (!getCookie("bball_sim_2.0_active_campaign")) {
      setCookie("bball_sim_2.0_active_campaign", activeCampaign.value, 7);
    }

    getUserTeam().then(() => {
      if (!userTeam.value) {
        router.push({ path: "/team-select" });
      } else {
        router.push({ path: "/team" });
      }
    });
  }

  function clearActiveCampaign() {
    activeCampaign.value = null;
    eraseCookie("bball_sim_2.0_active_campaign");
  }

  async function selectTeam(team_id) {
    const teamObject = {
      team_id: team_id,
      campaign_id: activeCampaign.value,
    };

    await axios.post(root + "/api/select_team", teamObject).then((res) => {
      if (res.data.success) {
        console.log("success", res.data);
        router.push({ path: "/team" });
      } else {
        console.log("failure..", res.data);
      }
    });
  }

  async function getUserCampaigns() {
    await axios.get(root + "/api/user_campaigns").then((res) => {
      if (res.data.success) {
        console.log("success", res.data);
        userCampaigns.value = res.data.user_campaigns;
      } else {
        console.log("failure..", res.data);
      }
    });
  }

  async function getUserTeam() {
    const teamObject = {
      campaign_id: activeCampaign.value,
    };
    await axios.post(root + "/api/user_team", teamObject).then((res) => {
      if (res.data.success) {
        console.log("success", res.data);

        userTeam.value = compileTeam(res.data.user_team);
      } else {
        console.log("failure..", res.data);
      }
    });
  }

  async function commitStarter(player) {
    console.log('commit starter', player);
  }

  //move to teamStore when caching stops fucking me
  async function getAllTeams() {
    await axios.get(root + "/api/all_teams").then((res) => {
      if (res.data.success) {
        console.log("success!", res.data);
        allTeams.value = JSON.parse(res.data.all_teams);
      } else {
        console.log("failure...", res.data);
      }
    });
  }

  return {
    loading,
    user,
    getUserCampaigns,
    userCampaigns,
    userTeam,
    createUser,
    login,
    checkUser,
    logout,
    createCampaign,
    activeCampaign,
    setActiveCampaign,
    getAllTeams,
    allTeams,
    selectTeam,
    getUserCampaigns,
    getUserTeam,
    commitStarter
  };
});
