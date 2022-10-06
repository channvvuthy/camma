<template>
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="gridLargeIconTitle"
    :stroke="fill"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
    color="#000000"
  >
    <title id="gridLargeIconTitle">Large Grid</title>
    <rect width="7" height="7" x="3" y="3" />
    <rect width="7" height="7" x="14" y="3" />
    <rect width="7" height="7" x="3" y="14" />
    <rect width="7" height="7" x="14" y="14" />
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