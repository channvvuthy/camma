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
          <FilterClass v-if="isSearch()" @search="getQueryString($event)" @gradeFilter="gradeFilter()" />
          <div>
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <GradeModal v-if="isModal" @closeModal="closeModal()" :moalTitle="moalTitle"
      @gradeSelected="gradeSelected($event)" />
  </div>
</template>
<script>
import Sidebar from "./views/Sidebar/Sidebar.vue";
import Menu from "./views/Menu/Menu.vue";
import FilterClass from "./views/Filter/FilterClass.vue";
import { mapState, mapActions } from "vuex";
import GradeModal from "./views/Book/components/GradeModal.vue";

export default {
  components: {
    Sidebar,
    Menu,
    FilterClass,
    GradeModal,
  },
  data() {
    return {
      moalTitle: "ថ្នាក់សិក្សា",
      isModal: false,
      showUpdate: false,
      showDownloading: false,
    };
  },

  computed: {
    ...mapState("auth", ["stProfile"]),
    ...mapState("course", ["courses", "loadingVideo"]),
  },

  methods: {
    ...mapActions("auth", ["getStudentProfile"]),
    ...mapActions("course", ["videoList"]),

    isSearch() {
      return this.$route.name == "home" || this.$route.name == "video";
    },

    getQueryString(s) {
      this.$store.commit("course/getQueryString", s);
    },
    gradeSelected(grade) {
      this.isModal = false;
      var filterElement = document.getElementById("filter");

      if (grade == "all") {
        this.$store.commit("course/getFilterByGradeID", "");
        filterElement.innerHTML = "ទាំងអស់";
        this.videoList();
        return;
      }

      this.$store.commit("course/getFilterByGradeID", grade._id);
      filterElement.innerHTML = grade.name;
      this.videoList();
    },
    closeModal() {
      this.isModal = false;
    },
    gradeFilter() {
      this.isModal = true;
    },
  },
  created() {
    if (!this.stProfile.first_name && !this.stProfile.last_name) {
      if (JSON.parse(localStorage.getItem("stProfile"))) {
        this.getStudentProfile(JSON.parse(localStorage.getItem("stProfile")));
      }
    }
  },
};
</script>
<style src="./assets/css/tailwind.css" />
