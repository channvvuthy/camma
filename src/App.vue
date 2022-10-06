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
          <FilterClass
            v-if="isSearch()"
            @search="getQueryString($event)"
            @gradeFilter="gradeFilter()"
          />
          <div>
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <Modal width="w-100" v-if="isModal">
      <div class="font-khmer_os text-sm text-nav">
        <!-- Header -->
        <div class="h-10 flex items-center px-5 justify-between border-b">
          <div class="text-base text-gray-700">{{ moalTitle }}</div>
          <div class="cursor-pointer" @click="closeModal()"><CloseIcon /></div>
        </div>
        <!-- Body -->
        <ul class="h-100 overflow-y-scroll overflow-x-hidden">
          <li class="cursor-pointer" @click="gradeSelected('all')">
            <div class="border-b">
              <div class="flex px-5 py-2">
                <div
                  class="
                    w-7
                    h-7
                    rounded-full
                    border border-custom
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CheckIcon />
                </div>
                <div class="w-2"></div>
                <div>ទាំងអស់</div>
              </div>
            </div>
          </li>
          <li
            v-for="(grade, index) in courses.grade"
            :key="index"
            class="cursor-pointer"
            @click="gradeSelected(grade)"
          >
            <div :class="index < courses.grade.length - 1 ? `border-b` : ``">
              <div class="flex px-5 py-2 items-center">
                <div
                  class="
                    w-7
                    h-7
                    rounded-full
                    border border-custom
                    flex
                    items-center
                    justify-center
                  "
                >
                  <CheckIcon />
                </div>
                <div class="w-2"></div>
                <div>{{ grade.name }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Modal>
  </div>
</template>
<script>
import Sidebar from "./views/Sidebar/Sidebar.vue";
import Menu from "./views/Menu/Menu.vue";
import FilterClass from "./views/Filter/FilterClass.vue";
import Modal from "./views/Modal/Modal.vue";
import CloseIcon from "./components/CloseIcon.vue";
import CheckIcon from "./components/CheckIcon.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Sidebar,
    Menu,
    FilterClass,
    Modal,
    CloseIcon,
    CheckIcon,
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
<style lang="scss">
body {
  overflow-x: hidden;
}
</style>

