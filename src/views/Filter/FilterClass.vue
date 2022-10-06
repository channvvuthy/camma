<template>
  <div class="p-5 font-khmer_os text-sm">
    <Greeting v-if="isGreeting()"/>
    <div class="mt-5 w-2/3 relative flex">
      <div class="absolute top-2 opacity-60"><SearchIcon /></div>
      <input
        v-model="s"
        v-on:keyup.enter="search"
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
        @click="gradeFilter"
      >
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
    isGreeting() {
      return this.$route.name == "home";
    },

    gradeFilter() {
      this.$emit("gradeFilter", true);
    },
  }
};
</script>
