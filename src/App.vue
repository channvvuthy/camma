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
          <FilterClass v-if="isSearch()" @search="getQueryString($event)" @gradeFilter="gradeFilter()"
            @showFilterBySubject="showFilterBySubject" />
          <div>
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <GradeModal v-if="isModal" @closeModal="closeModal()" :moalTitle="moalTitle"
      @gradeSelected="gradeSelected($event)" />

    <SubjectModal @closeModal="isSubjectFilter = false" v-if="isSubjectFilter" :moalTitle="subjectTitle"
      @subjectSelected="subjectSelected($event)" />

  </div>
</template>
<script>
import Sidebar from "./views/Sidebar/Sidebar.vue";
import Menu from "./views/Menu/Menu.vue";
import FilterClass from "./views/Filter/FilterClass.vue";
import { mapState, mapActions } from "vuex";
import GradeModal from "./views/Book/components/GradeModal.vue";
import SubjectModal from './views/Book/components/SubjectModal.vue';

export default {
  components: {
    Sidebar,
    Menu,
    FilterClass,
    GradeModal,
    SubjectModal
  },
  data() {
    return {
      moalTitle: "នាយកដ្ឋាន",
      isModal: false,
      showUpdate: false,
      showDownloading: false,
      isSubjectFilter: false,
      subjectTitle: "ជ្រើសរើសកម្មវិធីសិក្សា",
    };
  },

  computed: {
    ...mapState("auth", ["stProfile"]),
    ...mapState("course", ["courses", "loadingVideo", "subjectFilterTitle"]),
  },

  methods: {
    ...mapActions("auth", ["getStudentProfile"]),
    ...mapActions("course", ["videoList", "getFilter"]),

    subjectSelected(subject) {
      const subjectTitle = subject.name || "ជ្រើសរើសកម្មវិធីសិក្សា";
      const subjectId = subject._id || "";

      this.subjectTitle = subjectTitle;
      this.isSubjectFilter = false;

      this.$store.commit("course/setSubjectFilterTitle", subjectTitle);
      this.$store.commit("course/setSubjectId", subjectId);

      this.videoList();
    },

    isSearch() {
      return this.$route.name == "home" || this.$route.name == "video";
    },

    getQueryString(s) {
      this.$store.commit("course/getQueryString", s);
    },
    gradeSelected(grade) {
      this.isModal = false;
      const filterElement = document.getElementById("filter");
      const gradeName = grade === "all" ? "ទាំងអស់" : grade.name;
      const gradeId = grade === "all" ? "" : grade._id;

      this.$store.commit("course/getFilterByGradeID", gradeId);
      filterElement.innerHTML = gradeName;

      this.videoList();
    },

    closeModal() {
      this.isModal = false;
    },
    gradeFilter() {
      this.isModal = true;
    },
    showFilterBySubject() {
      this.isSubjectFilter = true;
    }
  },

  created() {
    const storedProfile = JSON.parse(localStorage.getItem("stProfile"));
    const { first_name, last_name } = this.stProfile;

    if (!first_name && !last_name && storedProfile) {
      this.getStudentProfile(storedProfile);
    }

    this.getFilter();
  }

};
</script>
<style src="./assets/css/tailwind.css" />
