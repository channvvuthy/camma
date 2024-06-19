<template>
  <div class="font-khmer_os text-base flex items-center bg-gray-100 m-5 rounded-lg px-5 py-2">
    <div class="w-1/2 flex-1">
      <Greeting v-if="isTextMenu('home')" />
      <div v-if="isTextMenu('video')" class="font-black text-xl">
        វីដេអូ
      </div>
    </div>
    <div class="relative flex w-1/2 bg-white h-full rounded-md px-3">
      <div class="absolute top-2 opacity-60">
        <SearchIcon :size="22" />
      </div>
      <input v-model="s" v-on:keyup.enter="search" type="text"
        class="h-9 rounded w-full outline-none pl-10 bg-transparent" placeholder="ស្វែងរក" />
      <div class="
          flex
          items-center
          cursor-pointer
          whitespace-nowrap
          text-gray-500
        " @click="gradeFilter">
        <div class="pr-2" id="filter">{{ filter }}</div>
        <FilterIcon />
      </div>
    </div>
  </div>
</template>
<script>
import Greeting from "./Greeting.vue";
import SearchIcon from "../../components/SearchIcon.vue";
import FilterIcon from "../../components/FilterIcon.vue";

export default {
  name: "FilterClass",
  components: {
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
  }
};
</script>
