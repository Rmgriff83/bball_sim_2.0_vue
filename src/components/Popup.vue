<template>
  <div 
    class="bball-sim-modal-box"
    style="
      position: fixed;
      top: 20px;
      width: 79.75vw;
      height:75vh;
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
     <h3 class="name">{{ data[1].name }}</h3>
     <h4 class="subtitle">
      Overall: {{ data[1].overall }}
      Positions: {{ parsePositions }}
     </h4>
    <p>{{ data[1] }}</p>
  </div>
</template>
  
<script>
import { computed } from 'vue';
  
export default {
  props: {
    type: String,
    data: Array,
  },

  setup(props) {

    const parsePositions = computed(() => {
      return props.data[1].meta.positions;
      
    });

    return {
      parsePositions
    }
  },
}
</script>
