<template>
   <div 
    class="wrapper"
    style="
      display: grid;
      grid-template-columns: 15% 85%;
    "
   >
    <div 
      class="minutes-box"
      style="
        border:1px solid green;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      mpg(%)
    </div>
      <div 
        class="info-box"
        style="
          display: grid;
          grid-template-columns: 20% 80%;
          border:1px solid blue;
        "  
      >
        <div>
          <p 
            v-if="type == 'starter'"
            class="position"
            style="
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 2em;
              text-transform: uppercase;
              margin: 0;
            "
          >
            <span v-if="starter_replacement">
              {{ returnPosition(starter_replacement)  }}
            </span>
            <span v-else>
              <span v-if="!invertPositionGetter">
                {{ returnPosition(player[1].starting_position) }}
              </span>
              <span v-else>
                {{ returnPosition(starter_replacement) }}
              </span>
            </span>
          </p>
          <p
            v-else
            style="
              border:1px solid green;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          >
            {{ player[1].meta.positions }}
          </p>
        </div>
      <div 
        class="meta-box"
        style="
          display: grid;
          grid-template-columns: 70% 30%;
        "
      >
        <div>
          <h4 
            class="name"
            style="
              font-size: 1.25em;
              font-weight: bold;
              margin: 4% 1%;
            "
          >
            <span>
            {{ player[1].name }}
            </span>
          </h4>
          <p>
            Overall: {{ player[1].overall }}
          </p>
        </div>
      <div 
        class="details-btn-box"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <button 
          v-if="from != 'adjust_starters_bench' || 'adjust_starters_starter'"
          @click.stop="$emit('viewPlayerDetails')"
          class="details-btn"
        >
          Details
        </button>
      </div>
    </div>
  </div>
</div>
</template>
  
<script>
  
export default {
  props: {
    type: String,
    player: Array,
    index: Number,
    from: String,
    starter_replacement: Number,
    invertPositionGetter: Boolean
  },
  style: [''],

  setup(props) {

    function returnPosition(position) {
      switch (position) {
        case 0:
          return 'Pg';
          break;
        case 1:
          return 'Sg';
          break;
        case 2:
          return 'Sf';
          break;
        case 3:
          return 'Pf';
          break;
        case 4: 
          return 'C';
          break;
      };

    };

    return {
      returnPosition
    }
  },
}
</script>
