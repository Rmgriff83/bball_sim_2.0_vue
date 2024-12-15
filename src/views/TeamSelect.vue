<template>
  <div class="team-select">
   <div>

    TeAM: {{ userTeam }}
    <div v-if="allTeams">
      <div v-for="team in allTeams" :key="team.id" class="team-tab">
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
            <!-- {{parseCoach(team)}} -->coach box
          </p>
          
        </div>
        <button @click="selectTeam(team.id)" class="select-team">
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
import { computed } from 'vue';
import { user } from '@/stores/user';
import { useRouter } from 'vue-router';

export default {
  setup() {
    //teamStore is not working for some reason..probably caching
    const userStore = user();
    const router = useRouter();

    const allTeams = computed(() => {
      if ( !userStore.allTeams ){
        userStore.getAllTeams();
      } else {
        return userStore.allTeams;
      }

      return userStore.allTeams;
    });

    // function parseCoach(team) {
    //   return JSON.parse(team.coach_object);
    // }

    function selectTeam(team_id) {
      return userStore.selectTeam(team_id);
    }

    const userTeam = computed(() => {
      if ( !userStore.userTeam ) {
        userStore.getUserTeam();
        return userStore.userTeam;
      }

      return userStore.userTeam;
    });

    if ( userTeam.value ) {
      router.push({path:"/team"});
    }

    // expose to template and other options API hooks
    return {
      allTeams,
      // parseCoach,
      selectTeam,
      userTeam
    }
  },
}
</script>

<style>
</style>
