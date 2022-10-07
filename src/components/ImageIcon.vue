<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    :width="size"
    :height="size"
    viewBox="0 0 172 172"
    style="fill: #000000"
  >
    <g
      fill="none"
      fill-rule="nonzero"
      stroke="none"
      stroke-width="1"
      stroke-linecap="butt"
      stroke-linejoin="miter"
      stroke-miterlimit="10"
      stroke-dasharray=""
      stroke-dashoffset="0"
      font-family="none"
      font-weight="none"
      font-size="none"
      text-anchor="none"
      style="mix-blend-mode: normal"
    >
      <path d="M0,172v-172h172v172z" fill="none"></path>
      <g :fill="fill">
        <path
          d="M143.33333,28.66667h-114.66667c-7.91917,0 -14.33333,6.41417 -14.33333,14.33333v86c0,7.91917 6.41417,14.33333 14.33333,14.33333h114.66667c7.91917,0 14.33333,-6.41417 14.33333,-14.33333v-86c0,-7.91917 -6.41417,-14.33333 -14.33333,-14.33333zM71.66667,57.33333c3.956,0 7.16667,3.21067 7.16667,7.16667c0,3.956 -3.21067,7.16667 -7.16667,7.16667c-3.956,0 -7.16667,-3.21067 -7.16667,-7.16667c0,-3.956 3.21067,-7.16667 7.16667,-7.16667zM136.16667,121.83333h-100.33333l25.07617,-32.24283l17.92383,21.5645l25.08333,-32.3145z"
        ></path>
      </g>
    </g>
  </svg>
</template>
<script>
export default {
  name: "ImageIcon",
  props: {
    size: {
      type: Number,
      default: () => {
        return 40;
      },
    },
    fill: {
      type: String,
      default: () => {
        return "#00a0e4";
      },
    },
  },
};
</script>