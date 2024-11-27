<template>
  <div class="">
    create createUser

    <form>
      <div class="form-input">
        <label for="first_name">First Name</label>
        <input type="text" name="first_name" id="first_name" v-model="firstName">{{ firstName }}
      </div>

      <div class="form-input">
        <label for="last_name">Last Name</label>
        <input type="text" name="last_name" id="last_name" v-model="lastName">
      </div>

      <div class="form-input">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" v-model="email">
      </div>

      <div class="form-input">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password">
      </div>

      <button @click.prevent="createUser">
        create user here
      </button>
    </form>

  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

export default {
  setup() {
    let root = 'http://127.0.0.1:8000';
    const router = useRouter()

    const firstName = ref(null);
    const lastName = ref(null);
    const email = ref(null);
    const password = ref(null);
  

    function createUser() {
      const userObject = {
        "first_name": firstName.value,
        "last_name": lastName.value,
        "email": email.value,
        "password": password.value
      };
      
      axios.post(root + '/api/create_user', userObject)
      .then((res) => {
        if ( res.data.success ) {
          console.log("success!", res.data);
          router.push({ path: '/team' })

        } else {
          console.log("failure..", res.data);
        }
    })
    }

    // expose to template and other options API hooks
    return {
      firstName,
      lastName,
      email,
      password,
      createUser
    }
  },

  mounted() {
  
  }
}
</script>

<style>
</style>
