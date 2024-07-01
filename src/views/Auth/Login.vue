<template>
  <div class="flex justify-center items-center min-h-screen bg-blue-50">
    <div class="flex-col rounded-2xl w-96 p-6 shadow-lg bg-white">
      <img src="/logo.svg" class="m-auto w-32 mb-8 mt-4" />
      <div>
        <form class="flex-col text-sm font-khmer_os">
          <div class="relative">
            <span class="
                absolute
                l-0
                buttom-0
                mt-2
                text-sm
                font-medium
                text-gray-500
              ">+855</span>
            <input type="text" placeholder="លេខទូរស័ព្ទ" v-model="auth.phone" @keypress="isNumber($event)" class="
                p-2
                border border-solid border-1 border-light-blue-500
                w-full
                focus:outline-none
                border-t-0 border-r-0 border-l-0
                mb-6
                pl-10
              " />
            <span class="absolute r-0 buttom-0 mt-2 text-red-700 text-lg">*</span>
          </div>
          <div class="relative">
            <input type="password" placeholder="លេខសម្ងាត់" autocomplete="off" v-model="auth.password"
              v-on:keyup.enter="studentLogin" class="
                p-2
                px-0
                border border-solid border-1 border-light-blue-500
                w-full
                focus:outline-none
                border-t-0 border-r-0 border-l-0
                mb-6
              " />
            <span class="absolute r-0 buttom-0 mt-2 text-red-700 text-lg">*</span>
          </div>
        </form>

        <div class="
            my-4
            p-3
            text-center
            flex
            justify-center
            items-center
            text-white
            rounded-md
            w-full
            outline-none
            text-sm
            cursor-pointer
            font-khmer_os
            hover:bg-opacity-90
          " @click="studentLogin" :class="loginLoading ? 'bg-primary bg-opacity-70' : 'bg-primary'">
          <div class="pl-2">
            <span v-if="!loginLoading">ចូលគណនី</span>
            <span v-else>កុំពុងដំណើការ &nbsp;
              <Loader :size="10" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <template>
      <Message v-if="errorMessage" :message="errorMessage" @closeMessage="closeMessage"></Message>
    </template>
  </div>
</template>

<script>
import Loader from "./../../components/Loader";
import Message from "./components/Message.vue";
import helper from "./../../helper/helper";
import { mapActions, mapState } from "vuex";
import config from "./../../config";

export default {
  components: {
    Loader,
    Message,
  },
  data() {
    return {
      loading: false,
      errorMessage: null,
      auth: {
        phone: null,
        password: null,
        device_id: helper.deviceId(),
        device_os: helper.deviceOs(),
        app_version: config.appVersion,
      },
    };
  },

  computed: {
    ...mapState("auth", ["loginLoading"]),
  },
  methods: {
    ...mapActions("auth", ["login", "getStudentProfile", "getToken"]),

    registerSuccess() {
      this.tap = "login";
    },
    closeMessage() {
      this.errorMessage = null;
    },

    isNumber(evt) {
      return helper.isNumber(evt);
    },

    studentLogin() {
      if (this.loginLoading) return;

      const { phone, password } = this.auth;

      if (!phone) {
        this.setErrorMessage("សូមបញ្ចូលលេខទូរស័ព្ទ");
        return;
      }

      if (!password) {
        this.setErrorMessage("សូមបញ្ចូលពាក្យសម្ងាត់");
        return;
      }

      if (phone && password) {
        this.login(this.auth)
          .then((response) => this.handleLoginResponse(response))
          .catch((error) => this.handleLoginError(error));
      }
    },

    setErrorMessage(message) {
      this.errorMessage = message;
    },

    handleLoginResponse(response) {
      if (response.data.status !== 0) {
        this.setErrorMessage(response.data.msg);
        return;
      }

      const data = response.data.data;
      localStorage.setItem("token", data.token);

      const stProfile = this.buildStudentProfile(data);
      localStorage.setItem("stProfile", JSON.stringify(stProfile));

      this.getStudentProfile(stProfile);
      this.getToken(data.token);
      this.$router.push({ name: "home" });
    },

    buildStudentProfile(data) {
      const defaultProfile = {
        _id: "",
        first_name: "",
        gender: "",
        grade_id: "",
        group_type: "",
        is_login: "",
        last_name: "",
        my_cart: "",
        phone: "",
        photo: "",
        branch: "",
        position: "",
        province: { _id: "", name: "CAMMA Microfinance" },
        school: { _id: "", name: "CAMMA Microfinance" },
      };

      return {
        ...defaultProfile,
        ...data,
        grade_id: data.grade_id || "",
        group_type: data.group_type || "",
        is_login: data.is_login || "",
        last_name: data.last_name || "",
        my_cart: data.my_cart || "",
        phone: data.phone || "",
        photo: data.photo || "",
        branch: data.branch || "",
        position: data.position || "",
        province: data.province || defaultProfile.province,
        school: data.school || defaultProfile.school,
      };
    },

    handleLoginError(error) {
      console.error("Login error:", error);
      this.setErrorMessage("An error occurred during login.");
    }

  },
};
</script>