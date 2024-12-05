<template>
  <div class="campaign-select">
    <div class="welcome-msg">
      <h1>
        BBall Sim 2.0
      </h1>
    </div>
    
    <h2>
      Select Campaign
    </h2>

    <div class="campaign-select-box">
      <button @click="createNewCampaigns" class="create-new-campaign">
        new
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { user } from '@/stores/user';

export default {
  setup() {
    const userStore = user();
    const router = useRouter();

    const userCampaigns = computed(() => {
      if ( !userStore.userCampaigns ) {
        userStore.getUserCampaigns();
      } else {
        return userStore.userCampaigns;
      }

      return userStore.userTeam;
    });

    function createNewCampaign() {
      console.log('create new campaign');
    }

    function toTeamSelect() {
      router.push({ path: "/team-select" });
    }

    function toFantasyDraft() {
      router.push({ path: "/fantasy-draft" });
    }

    // expose to template and other options API hooks
    return {
      userCampaigns,
      toTeamSelect,
      toFantasyDraft
    }
  },

  mounted() {
    
  }
}
</script>

<style>
</style>
