<template>
  <div class="">
   
    Login

    <form>
      <div class="form-input">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" v-model="state.email">
        <span v-if="v$.email.$error" class="form-error">
          {{v$.email.$errors[0].$message}}
        </span>
      </div>

      <div class="form-input">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="state.password">
        <span v-if="v$.password.$error" class="form-error">
          {{v$.password.$errors[0].$message}}
        </span>
      </div>

      <button @click.prevent="login">
        login
      </button>
    </form>

  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { user } from '@/stores/user';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';


export default {
  setup() {
    const userStore = user();

    const state = reactive({
      email: "",
      password: ""
    });

    const rules = {
      email: { email, required }, // Matches state.firstName
      password: { required }, // Matches state.lastName
    };

    const v$ = useVuelidate(rules, state);

    function login() {
      v$.value.$validate();
      if ( !v$.value.$error ) {
        return userStore.login(state.email, state.password);
      } else {
        console.log(v$.value.$error)
      }
    }

    // expose to template and other options API hooks
    return {
      v$,
      state,
      login
    }
  },

  mounted() {
  
  }
}
</script>

<style>
</style>
