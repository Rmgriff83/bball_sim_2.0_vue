<template>
  <div class="">
   
    Login

    <form>
      <div class="form-input">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" v-model="email">
      </div>

      <div class="form-input">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password">
      </div>

      <button @click.prevent="login">
        login
      </button>
    </form>

  </div>
</template>

<script>
import { ref } from 'vue';
import { user } from '@/stores/user';


export default {
  setup() {
    const userStore = user();

    const email = ref(null);
    const password = ref(null);

    function login() {
      return userStore.login(email.value, password.value);
    }

    // expose to template and other options API hooks
    return {
      email,
      password,
      login
    }
  },

  mounted() {
  
  }
}
</script>

<style>
</style>
