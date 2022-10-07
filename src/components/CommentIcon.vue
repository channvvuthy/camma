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
      <g fill="#000000">
        <path
          d="M26.875,21.5c-8.86035,0 -16.125,7.26465 -16.125,16.125v86c0,8.86035 7.26465,16.125 16.125,16.125h52.1123l39.2627,26.16114v-26.16114h16.125c8.86035,0 16.125,-7.26465 16.125,-16.125v-86c0,-8.86035 -7.26465,-16.125 -16.125,-16.125zM26.875,32.25h107.5c3.02344,0 5.375,2.35156 5.375,5.375v86c0,3.02344 -2.35156,5.375 -5.375,5.375h-26.875v16.83886l-25.2373,-16.83886h-55.3877c-3.02344,0 -5.375,-2.35156 -5.375,-5.375v-86c0,-3.02344 2.35156,-5.375 5.375,-5.375zM43,53.75v10.75h75.25v-10.75zM43,75.25v10.75h75.25v-10.75zM43,96.75v10.75h43v-10.75z"
        ></path>
      </g>
    </g>
  </svg>
</template>
<script>
export default {
  name: "CommentIcon",
  props: {
    size: {
      default: function () {
        return 24;
      },
    },
  },
};
</script>