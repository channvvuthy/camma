<template>
  <svg
    aria-hidden="true"
    :width="size"
    :height="size"
    focusable="false"
    data-prefix="far"
    data-icon="arrow-to-bottom"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    class="svg-inline--fa fa-arrow-to-bottom fa-w-12 fa-3x"
  >
    <path
      :fill="fill"
      d="M348.5 232.1l-148 148.4c-4.7 4.7-12.3 4.7-17 0l-148-148.4c-4.7-4.7-4.7-12.3 0-17l19.6-19.6c4.8-4.8 12.5-4.7 17.1.2l93.7 97.1V44c0-6.6 5.4-12 12-12h28c6.6 0 12 5.4 12 12v248.8l93.7-97.1c4.7-4.8 12.4-4.9 17.1-.2l19.6 19.6c4.9 4.7 4.9 12.3.2 17zM372 428H12c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h360c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12z"
      class=""
    />
  </svg>
</template>

<script>
export default {
  name: "DownloadIcon",
  props: {
    fill: {
      default: function () {
        return "#2c384aae";
      },
    },
    size: {
      default: function () {
        return 24;
      },
    },
  },
};
</script>