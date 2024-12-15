<template>
    <div class="test">
  
      {{ userStore.user }}

      <hr>

      {{ text }}
     
      <a @click="toLoginPage()" v-show="userStore.user == null">
        Login
      </a>
      <p v-show="userStore.user != null">
        Hello user
        <br>
        <button @click="logout">
          <span v-if="!userStore.loading">
            logout
          </span>
          <span v-else>
            logging out...
          </span>
        </button>
      </p>
      
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { user } from '@/stores/user';
  import { useRouter } from 'vue-router';
  
  export default {
    props: {
      
    },
    // styles: [
    //   '.test{border: 3px solid pink}'
    // ],

    setup() {
     const userStore = user();
     const router = useRouter();
  
     function logout() {
        userStore.logout();
     }
  
     function toLoginPage() {
      router.push({ path: "/login" });
     }
  
      return {
        userStore,
        logout,
        toLoginPage
      }
    }
  }
  </script>
  
  <style scoped>
    
  </style>
  