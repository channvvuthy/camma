<template>
  <div class="font-khmer_os text-base flex items-center bg-gray-100 m-5 rounded-lg px-5 py-2">
    <div class="w-5/12">
      <Greeting v-if="isTextMenu('home')" />
      <div v-if="isTextMenu('video')" class="font-black text-xl">
        វីដេអូ
      </div>
    </div>
    <div class="relative flex w-full bg-white h-full rounded-md px-3">
      <div class="absolute top-2 opacity-60">
        <SearchIcon :size="22" />
      </div>
      <input v-model="s" v-on:keyup.enter="search" type="text"
        class="h-9 rounded w-full outline-none pl-10 bg-transparent" placeholder="ស្វែងរក" />
      <div class="
          flex
          items-center
          whitespace-nowrap
          text-gray-500
        ">
        <div class="flex items-center cursor-pointer" @click="gradeFilter">
          <div class="pr-2" id="filter">{{ filter }}</div>
          <FilterIcon />
        </div>
        <div class="w-10">
        </div>
        <div @click="showFilterBySubject" class="cursor-pointer">
          <FilterInput :title="subjectFilterTitle" />
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import Greeting from "./Greeting.vue";
import SearchIcon from "../../components/SearchIcon.vue";
import FilterIcon from "../../components/FilterIcon.vue";
import FilterInput from "../Book/components/FilterInput.vue";
import { mapState } from "vuex/dist/vuex.common.js";

export default {
  components: {
    Greeting,
    SearchIcon,
    FilterIcon,
    FilterInput
  },
  data() {
    return {
      gradeActive: "",
      filter: "ទាំងអស់",
      s: "",
    };
  },
  computed: {
    ...mapState("course", ["subjectFilterTitle"])
  },
  methods: {
    search() {
      this.$emit("search", this.s);
    },
    isTextMenu(routeName) {
      return this.$route.name == routeName;
    },
    gradeFilter() {
      this.$emit("gradeFilter", true);
    },
    showFilterBySubject() {
      this.$emit("showFilterBySubject", true);
    }
  }
};
</script>
