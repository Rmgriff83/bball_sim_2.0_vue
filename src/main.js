import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";

const app = createApp(App);

app.use(createPinia());
app.use(router);

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

if (getCookie("bball_sim_2.0_auth")) {
  //set bearer token for future requests
  axios.defaults.headers.common = {
    Authorization: `Bearer ${getCookie("bball_sim_2.0_auth")}`,
  };
}

app.mount("#app");
