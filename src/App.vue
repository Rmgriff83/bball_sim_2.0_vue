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
import LoginIconNew from '@/components/LoginIconNew.vue';
export default {
  setup() {
   const CustomLoginIconNew = defineCustomElement(LoginIconNew);
   customElements.define('login-icon', CustomLoginIconNew);

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
