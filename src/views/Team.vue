<template>
  <div class="team">
    team
    <br>
    <div v-if="parseTeam">
      <h1>
      {{ parseTeam.city + " " + parseTeam.name }}
    </h1>

    <h2>
      {{ parseTeam.coach }}
    </h2>
    </div>

    <div v-else>
      <v-progress-circular indeterminate></v-progress-circular>
    </div>

  </div>
</template>

<script>
import { computed } from 'vue';
import { user } from '@/stores/user';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const userStore = user();
    const router = useRouter();

    const userTeam = computed(() => {
      if ( !userStore.userTeam ) {
        userStore.getUserTeam();
      } else {
        return userStore.userTeam;
      }

      return userStore.userTeam;
    });

    const parseTeam = computed(() => {
      if ( userTeam.value ) {
        return {
          "name": userTeam.value.name,
          "city": userTeam.value.city,
          "coach": JSON.parse(userTeam.value.coach_object)
        }
      }
    });

    // expose to template and other options API hooks
    return {
      userTeam,
      parseTeam
    }
  },

  mounted() {
  }
}
</script>

<style>
</style>
