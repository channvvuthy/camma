<template>
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
    @click="filterInput"
  >
    <div class="pr-2" id="filter">{{ title }}</div>
    <FilterIcon />
  </div>
</template>
<script>
import FilterIcon from "../../../components/FilterIcon.vue";
export default {
  components: {
    FilterIcon,
  },
  props: {
    title: {
      default: function () {
        return "";
      },
    },
  },
  methods: {
    filterInput() {
      this.$emit("filterInput", true);
    },
  },
};
</script>