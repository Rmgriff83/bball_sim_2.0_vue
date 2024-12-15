<template>
  <div class="team">
    team
    <br>
    <div v-if="parseTeam">
      <h1>
      {{ parseTeam.city + " " + parseTeam.name }}
      </h1>
      <p>
        Overall: {{ parseTeam.overall }}
      </p>

      <h2>
        Coach: {{ parseTeam.coach.first_name + " " + parseTeam.coach.last_name }}
      </h2>

      <h3>
        Starting Lineup
      </h3>

      <div v-for="(player, index) in Object.entries(parseTeam.starters)" :key="index" class="starter-tab">
        <bball-sim-player-tab
          @click="showAdjustStarterModal(player, true)"
          @viewPlayerDetails="viewPlayerDetails(player)"
          type="starter"
          :player="player"
          :index="index"
        />
    </div>

    <hr>

    <h3>
      Bench:
    </h3>

      <div v-for="player in Object.entries(parseTeam.bench)" :key="player.id" class="bench-tab">
        <bball-sim-player-tab
          @click="showAdjustStarterModal(player)"
          @viewPlayerDetails="viewPlayerDetails(player)"
          type="bench"
          :player="player"
        />
      </div>
    
    </div>

    <div v-else>
      <v-progress-circular indeterminate></v-progress-circular>
    </div>

    <bball-sim-popup
      v-if="playerDetailsModal"
      type="player"
      :data="activeModalPlayer"
      @close="close('details')"
    />

    <bball-sim-adjust-starter-popup
      v-if="adjustStarterModal"
      :player="activeAdjustStarterPlayer"
      :potentialStarters="currentPotentialStarters"
      @close="close('adjust_starters')"
      :invert="invertAdjustStarterPopupCols"
    />

  </div>
</template>

<script>
import { computed, ref } from 'vue';
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
          "name": userTeam.value.team_info.name,
          "city": userTeam.value.team_info.city,
          "overall": userTeam.value.overall,
          "coach": userTeam.value.coach.coach_object,
          "bench": userTeam.value.bench,
          "meta": userTeam.value.meta,
          "starters": userTeam.value.starters
        }
      }
    });

    const playerDetailsModal = ref(false);
    const activeModalPlayer = ref(null);
    const adjustStarterModal = ref(false);
    const activeAdjustStarterPlayer = ref(null);
    const invertAdjustStarterPopupCols = ref(false);

    function viewPlayerDetails(player) {

      if ( adjustStarterModal ) {
        adjustStarterModal.value = false;
      }

      activeModalPlayer.value = player;
      playerDetailsModal.value = !playerDetailsModal.value;
    }

    const currentPotentialStarters = ref([]);

    function showAdjustStarterModal(player, starter=false) {

      if ( playerDetailsModal ) {
        playerDetailsModal.value = false;
      }

      activeAdjustStarterPlayer.value = player;

      if ( !starter ) {
        const currentStarters = Object.values(parseTeam.value.starters);

        player[1].meta.positions.forEach((position) => {
          //because starters position is based on index of array
          //also now have it on the starter object..but in db its based off index remember
          const realPosition = position - 1;
          currentPotentialStarters.value.push(currentStarters[realPosition])
        });
      } else {
        invertAdjustStarterPopupCols.value = true;
        const currentBenchPlayers = Object.values(parseTeam.value.bench);
        let startingPosition = player[1].starting_position + 1;

        currentBenchPlayers.forEach((benchPlayer) => {
          if ( benchPlayer.meta.positions.includes(startingPosition) ) {
            currentPotentialStarters.value.push(benchPlayer);
          }
        });
      }

      adjustStarterModal.value = true;
    }

    function close(from) {
      if ( from == 'details' ) {
        playerDetailsModal.value = false;
        activeModalPlayer.value = null;
      }
      if ( from == 'adjust_starters') {
        adjustStarterModal.value = false;
        currentPotentialStarters.value = [];
        invertAdjustStarterPopupCols.value = false;
      }
    }

    // expose to template and other options API hooks
    return {
      userTeam,
      parseTeam,
      viewPlayerDetails,
      playerDetailsModal,
      activeModalPlayer,
      close,
      adjustStarterModal,
      activeAdjustStarterPlayer,
      currentPotentialStarters,
      showAdjustStarterModal,
      invertAdjustStarterPopupCols
    }
  },

  mounted() {
  }
}
</script>

<style>
</style>
