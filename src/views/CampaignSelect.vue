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
      <button @click="createCampaign" class="create-new-campaign">
        new
      </button>

      <div v-for="campaign in userCampaigns" :key="campaign.id" class="campaign-tab">
        <div class="campaign-box">
          Id: {{ campaign.id }}
          <button @click="setActiveCampaign(campaign.id)" class="select-campaign">
            Select
          </button>
        </div>
      </div>
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

    const activeCampaign = computed(() => {
      return userStore.activeCampaign;
    });

    if ( activeCampaign.value ) {
      router.push({path:"/team"});
    }

    function createCampaign() {
      return userStore.createCampaign();
    }

    function setActiveCampaign(campaign_id) {
      return userStore.setActiveCampaign(campaign_id);
    }

    // function toTeamSelect() {
    //   router.push({ path: "/team-select" });
    // }

    // function toFantasyDraft() {
    //   router.push({ path: "/fantasy-draft" });
    // }

    // expose to template and other options API hooks
    return {
      createCampaign,
      setActiveCampaign,
      userCampaigns,
      // toTeamSelect,
      // toFantasyDraft
    }
  },

  mounted() {
    
  }
}
</script>

<style>
</style>
