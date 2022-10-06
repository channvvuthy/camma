<template>
  <div id="app" class="relative">
    <div v-if="$route.name == 'login' || $route.name == 'change-password'">
      <router-view />
    </div>
    <div class="flex max-h-screen" v-else>
      <div class="border-r border-border">
        <sidebar :stProfile="stProfile" />
      </div>
      <div class="flex w-full">
        <div class="border border-b-0 border-l-0 border-gray-200 w-full">
          <Menu />
          <FilterClass />
          <div>
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "./views/Sidebar/Sidebar.vue";
import Menu from "./views/Menu/Menu.vue";
import Search from "./views/Search/Search.vue";
import FilterClass from "./views/Filter/FilterClass.vue";
import { mapState, mapActions } from "vuex";
import axios from "axios";
import config from "./config";
const { ipcRenderer } = require("electron");

export default {
  components: {
    Sidebar,
    Menu,
    Search,
    FilterClass,
  },
  data() {
    return {
      showUpdate: false,
      showDownloading: false,
    };
  },

  computed: {
    ...mapState("auth", ["stProfile"]),
  },

  methods: {
    ...mapActions("auth", ["getStudentProfile"]),
    ...mapActions("setting", ["checkingAppVersion"]),
  },
  created() {
    if (!this.stProfile.first_name && !this.stProfile.last_name) {
      if (JSON.parse(localStorage.getItem("stProfile"))) {
        this.getStudentProfile(JSON.parse(localStorage.getItem("stProfile")));
      }
    }
    ipcRenderer.on("checking-for-update", () => {
      this.showDownloading = true;
    });
  },
};
</script>
<style lang="scss">
body {
  overflow-x: hidden;
}
</style>

