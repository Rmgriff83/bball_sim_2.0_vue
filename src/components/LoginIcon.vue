<template>
  <div>

    {{ userStore.user }}
   
    <a v-show="userStore.user == null">
      Login
    </a>
    <p v-show="userStore.user != null">
      Hello user
      <br>
      <button @click="logout">
        logout
      </button>
    </p>
    
    
  </div>
</template>

<script>
import { ref } from 'vue';
import { user } from '@/stores/user';


export default {
  setup() {
   const userStore = user();
   userStore.checkUser();

   function logout() {
    userStore.logout();
   }

    return {
      userStore,
      logout
    }
  },

  mounted() {
  }
}
</script>

<style scoped>

</style>
