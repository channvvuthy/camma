import Vue from "vue";
import "sweetalert2/dist/sweetalert2.min.css";
import VueSweetalert2 from "vue-sweetalert2";
Vue.use(VueSweetalert2);
import helper from "./helper";
import store from "./../store";
import router from "./../router/";
const { ipcRenderer } = require("electron");

const err = (msg, type = 1) => {
  Vue.swal
    .fire({
      title: msg,
      confirmButtonText: helper.gender() === "F" ? "ចាស់" : "បាទ",
    })
    .then((result) => {
      if (result.isConfirmed) {
        if (type === 1) {
          store.dispatch("auth/logout").then(() => {
            router.push({
              name: "login",
            });
          });
        }
      }
    });
};
const connectionErr = (msg) => {
  Vue.swal
    .fire({
      title: msg,
      confirmButtonText: helper.gender() === "F" ? "ចាស់" : "បាទ",
    })
    .then((result) => {
      if (result.isConfirmed) {
        console.log("connectionError");
      }
    });
};
const congratulation = (msg, url) => {
  Vue.swal
    .fire({
      title: msg,
      confirmButtonText: helper.gender() === "F" ? "ចាស់" : "បាទ",
    })
    .then((result) => {
      if (result.isConfirmed) {
        ipcRenderer.send("openLink", url);
      }
    });
};

const forgotPassword = (msg) => {
  Vue.swal.fire({
    title: msg,
    confirmButtonText: helper.gender() === "F" ? "ចាស់" : "បាទ",
  });
};

export default {
  err,
  forgotPassword,
  connectionErr,
  congratulation,
};
