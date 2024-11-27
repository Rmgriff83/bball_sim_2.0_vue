<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/team">Team</RouterLink>
        <RouterLink to="/new-user">New User</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
      <login-icon />
    </div>
  </header>

  <RouterView />
</template>

<script>
import { defineCustomElement } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import LoginIcon from '@/components/LoginIcon.vue';
export default {
  setup() {
   const CustomLoginIcon = defineCustomElement(LoginIcon);
   customElements.define('login-icon', CustomLoginIcon);

    // expose to template and other options API hooks
    return {
    
    }
  },

  mounted() {
    
  }
}
</script>

<style scoped>

</style>
