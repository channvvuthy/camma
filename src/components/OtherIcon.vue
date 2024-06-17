<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1" :stroke="fill" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round" />
    <rect x="3" y="14" width="7" height="7" rx="1" :stroke="fill" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round" />
    <rect x="14" y="3" width="7" height="7" rx="1" :stroke="fill" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round" />
    <rect x="14" y="14" width="7" height="7" rx="1" :stroke="fill" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round" />
  </svg>
</template>

<script>
export default {
  props: {
    fill: {
      default: function () {
        return "#000000";
      },
    },
    size: {
      default: function () {
        return 22;
      },
    },
  },
};
</script>