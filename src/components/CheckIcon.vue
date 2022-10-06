<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline
      fill="none"
      :stroke="fill"
      stroke-width="2"
      points="6 13 10.2 16.6 18 7"
    />
  </svg>
</template>

<script>
export default {
  name: "CheckIcon",
  props: {
    size: {
      type: Number,
      default: function () {
        return 22;
      },
    },

    fill: {
      type: String,
      default: function () {
        return "#40b366";
      },
    },
  },
};
</script>