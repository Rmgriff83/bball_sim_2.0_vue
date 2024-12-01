import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const user = defineStore("allTeams", () => {
  const allTeams = ref([]);

  async function getAllTeams() {
    await axios.get(root + "/api/all_teams").then((res) => {
      if (res.data.success) {
        console.log("success!", res.data);
        allTeams.value = res.data.all_teams;
      } else {
        console.log("failure...", res.data);
      }
    });
  }

  return {
    allTeams,
    getAllTeams,
  };
});
