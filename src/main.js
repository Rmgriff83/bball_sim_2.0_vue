import "./assets/main.css";

import { createApp } from "vue/dist/vue.esm-bundler";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify);
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

import { user } from "@/stores/user";
const userStore = user();
userStore.checkUser();

if (getCookie("bball_sim_2.0_active_campaign")) {
  userStore.activeCampaign = getCookie("bball_sim_2.0_active_campaign");
}

//add global components
import { defineCustomElement } from "vue";
import LoginIcon from "@/components/LoginIcon.vue";
import Popup from "@/components/Popup.vue";
import AdjustStarterPopup from "@/components/AdjustStarterPopup.vue";
import PlayerTab from "@/components/PlayerTab.vue";
const BballSimLoginIcon = defineCustomElement(LoginIcon);
const BballSimPopup = defineCustomElement(Popup);
const BballSimAdjustStarterPopup = defineCustomElement(AdjustStarterPopup);
const BballSimPlayerTab = defineCustomElement(PlayerTab);

customElements.define("bball-sim-login-icon", BballSimLoginIcon);
customElements.define("bball-sim-popup", BballSimPopup);
customElements.define(
  "bball-sim-adjust-starter-popup",
  BballSimAdjustStarterPopup
);
customElements.define("bball-sim-player-tab", BballSimPlayerTab);

app.mount("#app");
