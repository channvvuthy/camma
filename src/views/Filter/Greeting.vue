<template>
  <div class="flex items-center text-gray-500 text-base">
    <img src="smile.svg" width="27" class="mr-2" />
    <div>{{ greeting }}</div>
    <div class="w-2"></div>
    <div>{{ stProfile.first_name }} {{ stProfile.last_name }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("auth", ["stProfile"]),
    greeting() {
      const hours = new Date().getHours();
      if (hours < 12) return "អរុណសួស្តី";
      if (hours < 18) return "ទិវាសួស្តី";
      return "សាយណ្ហសួស្តី";
    }
  }
};
</script>
