<template>
  <div class="mode-select">
    <div class="welcome-msg">
      <h1>
        You're In!
      </h1>
    </div>
    <div class="select-box">
      <button @click="toTeamSelect" class="mode-select-btn">
        Start with a Team
      </button>
      <p>
        Or
      </p>
      <button @click="toFantasyDraft" class="mode-select-btn">
        Fantasy Draft
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    function toTeamSelect() {
      router.push({ path: "/team-select" });
    }

    function toFantasyDraft() {
      router.push({ path: "/fantasy-draft" });
    }

    // expose to template and other options API hooks
    return {
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
