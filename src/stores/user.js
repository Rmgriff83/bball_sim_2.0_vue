import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from "vue-router";

export const user = defineStore("user", () => {
  let root = "http://127.0.0.1:8000";
  const router = useRouter();

  const user = ref(null);

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function eraseCookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  async function createUser(firstName, lastName, email, password) {
    const userObject = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };

    await axios.post(root + "/api/create_user", userObject).then((res) => {
      if (res.data.success) {
        console.log("success!", res.data);

        //set bearer token for future requests
        axios.defaults.headers.common = {
          Authorization: `Bearer ${res.data.token.plainTextToken}`,
        };

        setCookie("bball_sim_2.0_auth", res.data.token.plainTextToken, 7);

        user.value = res.data.user;
        router.push({ path: "/team" });
      } else {
        console.log("failure..", res.data);
      }
    });
  }

  async function login(email, password) {
    const userObject = {
      email: email,
      password: password,
    };

    await axios.post(root + "/api/login", userObject).then((res) => {
      if (res.data.success) {
        console.log("success!", res.data);

        //set bearer token for future requests
        axios.defaults.headers.common = {
          Authorization: `Bearer ${res.data.token.plainTextToken}`,
        };

        setCookie("bball_sim_2.0_auth", res.data.token.plainTextToken, 7);

        user.value = res.data.user;
        router.push({ path: "/team" });
      } else {
        console.log("failure..", res.data);
      }
    });
  }

  async function checkUser() {
    await axios.get(root + "/api/check").then((res) => {
      if (res.data.success) {
        console.log("success", res.data);
        user.value = res.data.user;
      } else {
        console.log("failure..", res.data);
        user.value = null;
      }
    });
  }

  async function logout() {
    await axios.post(root + "/api/logout").then((res) => {
      eraseCookie("bball_sim_2.0_auth");
      if (res.data.success) {
        console.log("success", res.data);
        user.value = null;
      } else {
        console.log("failure..", res.data);
      }
    });
  }

  return {
    user,
    createUser,
    login,
    checkUser,
    logout,
  };
});
