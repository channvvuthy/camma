<template>
  <div class="p-5 font-khmer_os text-sm">
    <Greeting />
    <div class="mt-5 w-2/3 relative flex">
      <div class="absolute top-2 opacity-60"><SearchIcon /></div>
      <input
        v-model="s"
        @keypress="search"
        type="text"
        class="border-b h-10 rounded w-full outline-none pl-10 bg-transparent"
        placeholder="ស្វែងរក"
      />
      <div
        class="
          h-10
          flex
          items-center
          cursor-pointer
          border-b
          whitespace-nowrap
          text-gray-500
        "
      >
        <div class="pr-2">{{ filter }}</div>
        <FilterIcon />
      </div>
    </div>
  </div>
</template>
<script>
const { ipcRenderer } = require("electron");
import { mapState, mapActions } from "vuex";
import VueHorizontal from "vue-horizontal";
import helper from "./../../helper/helper";
import Greeting from "./Greeting.vue";
import SearchIcon from "../../components/SearchIcon.vue";
import FilterIcon from "../../components/FilterIcon.vue";

export default {
  name: "FilterClass",
  components: {
    VueHorizontal,
    Greeting,
    SearchIcon,
    FilterIcon,
  },
  data() {
    return {
      gradeActive: "",
      filter: "ទាំងអស់",
      s: "",
    };
  },

  computed: {
    ...mapState("course", ["courses", "loadingVideo"]),

    idOfGrade: {
      get() {
        return this.$store.state.course.gradeID;
      },
      set(gradeID) {
        return gradeID;
      },
    },
  },

  methods: {
    ...mapActions("course", ["videoList", "filterByGradeID"]),
    search() {
      if (this.s) {
        this.$emit("search", this.s);
      }
    },
    cutString(text, limit) {
      return helper.cutString(text, limit);
    },

    filterGradeId(gradeId) {
      ipcRenderer.send("gradeFilter", gradeId);

      this.filterByGradeID(gradeId);
      this.gradeActive = gradeId;
      this.videoList(gradeId);
    },
  },
  watch: {
    idOfGrade: function (id) {
      this.gradeActive = id;
    },
  },
};
</script>
