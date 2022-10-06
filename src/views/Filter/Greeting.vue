<template>
  <div class="flex items-center text-gray-500 text-sm">
    <div class="mr-2">
      <img src="smile.svg" width="27" />
    </div>
    <div>{{ greeting() }}</div>
    <div class="w-2"></div>
    <div>{{ stProfile.first_name }} {{ stProfile.last_name }}</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["stProfile"]),
  },
  methods: {
    greeting() {
      var today = new Date();
      var curHr = today.getHours();
      var time = null;

      if (curHr < 12) {
        time = "អរុណសួស្តី";
      } else if (curHr < 18) {
        time = "ទិវាសួស្តី";
      } else {
        time = "សាយណ្ហសួស្តី";
      }

      return time;
    },
  },
};
</script>