import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/tailwind.css";
import axios from "axios";
import config from "./config";
import helper from "./helper/helper";
import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");

    if (token) {
      config.headers["xtoken"] = token;
      config.headers["device-id"] = helper.deviceId();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["app-version"] = config.appVersion;
axios.defaults.headers.common["device-os"] = helper.deviceOs();
axios.defaults.headers.common["device-id"] = helper.deviceId();
axios.defaults.headers.common["device-name"] = helper.deviceName();
axios.defaults.headers.common["Authorization"] = config.auth;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    store.dispatch("online/onlineOffline");
  },
}).$mount("#app");
