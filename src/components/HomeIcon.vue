<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="var(--ci-primary-color, currentColor)"
      d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z"
      class="ci-primary"
    />
  </svg>
</template>

<script>
export default {
  name: "HomeIcon",
  props: {
    fill: {
      type: String,
      default: function () {
        return "#000000";
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
