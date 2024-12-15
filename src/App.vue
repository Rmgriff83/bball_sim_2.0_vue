<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/team">Team</RouterLink>
        <RouterLink to="/new-user">New User</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
      <bball-sim-login-icon />
    </div>
  </header>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
export default {
  setup() {

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
