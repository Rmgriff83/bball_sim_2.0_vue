<template>
  <div class="team">
    team
    <br>
    {{ myTeam }}

  </div>
</template>

<script>
import myTeam from '@/objects/teams/myTeam';
import axios from 'axios';


export default {
  setup() {

    // expose to template and other options API hooks
    return {
      myTeam
    }
  },

  mounted() {
    let root = 'http://127.0.0.1:8000';

    axios.get(root + '/api/team', {
      params: {
        "team": myTeam
      }
    })
      .then((res) => {
      console.log(res.data)
    })
  }
}
</script>

<style>
</style>
