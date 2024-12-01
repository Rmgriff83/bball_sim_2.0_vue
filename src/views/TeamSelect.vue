<template>
  <div class="team-select">
   <div>
    <div v-if="userStore.allTeams.length > 0">
      <div v-for="team in userStore.allTeams" :key="team.id" class="team-tab">
      <div class="team-box">
        <h2 class="team-name">{{ team.city + " " + team.name }}</h2>
        <div class="team-content">
          <div class="team-meta">
          <p>
            {{ team.division }} Division
          </p>
          <p>
            overall rating: ?
          </p>
          <p class="coach-box">
            {{parseCoach(team)}}
          </p>
          
        </div>
        <button class="select-team">
          Select
        </button>
        </div>
      </div>
    </div>
    </div>
    <div v-else>
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
   </div>
  </div>
</template>

<script>
import { user } from '@/stores/user';

export default {
  setup() {
    //teamStore is not working for some reason..probably caching
    const userStore = user();

    userStore.getAllTeams();

    function parseCoach(team) {
      return JSON.parse(team.coach_object);
    }

    // expose to template and other options API hooks
    return {
      userStore,
      parseCoach
    }
  },
}
</script>

<style>
</style>
