<template>
  <div class="">
    create createUser

    <form>
      <div class="form-input">
        <label for="first_name">First Name</label>
        <input type="text" name="first_name" id="first_name" v-model="state.firstName">
        <span v-if="v$.firstName.$error" class="form-error">
          {{v$.firstName.$errors[0].$message}}
        </span>
      </div>

      <div class="form-input">
        <label for="last_name">Last Name</label>
        <input type="text" name="last_name" id="last_name" v-model="state.lastName">
        <span v-if="v$.lastName.$error" class="form-error">
          {{v$.lastName.$errors[0].$message}}
        </span>
      </div>

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

      <button @click.prevent="createUser">
        create user here
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
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });

    const rules = {
      firstName: { required },
      lastName: { required },
      email: { email, required }, // Matches state.firstName
      password: { required }, // Matches state.lastName
    };

    const v$ = useVuelidate(rules, state);
  
    function createUser() {
      const userObject = {
        "first_name": state.firstName,
        "last_name": state.lastName,
        "email": state.email,
        "password": state.password
      };

      v$.value.$validate();

      if ( !v$.value.$error ) {
        return userStore.createUser(
          state.firstName, 
          state.lastName, 
          state.email, 
          state.password);
      } else {
        console.log(v$.value.$error)
      }
      
    }

    // expose to template and other options API hooks
    return {
      v$,
      state,
      createUser
    }
  },

  mounted() {
  
  }
}
</script>

<style>
</style>
