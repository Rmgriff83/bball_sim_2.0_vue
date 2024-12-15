<template>
  <div 
    class="bball-sim-adjust-starter-modal-box"
    style="
      position: fixed;
      top: 50px;
      width:79.75vw;
      height:fit-content;
      margin:5%;
      padding:5%;
      background-color: white;
      border:1px solid purple;
      border-radius: 6px;
    "
  >
    <button 
      @click="$emit('close')" 
      class="close"
      style="
        font-weight: bold;
        font-size: 1.2em;
      "
    >
      Close
    </button>

    <h4>
      <span v-if="!invert">
        Sub Out
      </span>
      <span v-else>
        Sub In
      </span>
      <hr>
    </h4>

    <div v-for="(potentialStarter, index) in Object.entries(potentialStarters)" :key="index">
      <bball-sim-player-tab 
        @click="commitStarter(potentialStarter)"
        type="starter"
        :player="potentialStarter"
        :starter_replacement="player[1].starting_position"
        :index="index"
        :invertPositionGetter="invert"
        from="adjust_starters_starter"
        style="
          cursor: pointer;
        "
      />
    </div>
    
    <h4>
      <span v-if="invert">
        Sub Out
      </span>
      <span v-else>
        Sub In
      </span>
      <hr>
    </h4>
      <bball-sim-player-tab 
        type="bench"
        :player="Object.values(player)"
        from="adjust_starters_bench"
      />
  </div>
</template>
  
<script>
import { computed } from 'vue';
import { user } from '@/stores/user';
  
export default {
  props: {
   type: String,
   player: Array,
   potentialStarters: Array,
   invert: Boolean
  },

  setup(props) {
    const userStore = user();

    const parsePositions = computed(() => {
      if ( props.type != 'starter') {
        return props.player[1].meta.positions;
      } else {
        return props.player[0];
      }
      
    });

    function commitStarter(player) {
      return userStore.commitStarter(player);
    }

    return {
      parsePositions,
      commitStarter
    }
  },
}
</script>
