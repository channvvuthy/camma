<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="24"
    height="24"
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
          d="M86,14.33333c-39.5815,0 -71.66667,32.08517 -71.66667,71.66667c0,39.5815 32.08517,71.66667 71.66667,71.66667c39.5815,0 71.66667,-32.08517 71.66667,-71.66667c0,-39.5815 -32.08517,-71.66667 -71.66667,-71.66667zM111.08333,57.33333c5.94833,0 10.75,4.80167 10.75,10.75c0,5.94833 -4.80167,10.75 -10.75,10.75c-5.94833,0 -10.75,-4.80167 -10.75,-10.75c0,-5.94833 4.80167,-10.75 10.75,-10.75zM60.91667,57.33333c5.94833,0 10.75,4.80167 10.75,10.75c0,5.94833 -4.80167,10.75 -10.75,10.75c-5.94833,0 -10.75,-4.80167 -10.75,-10.75c0,-5.94833 4.80167,-10.75 10.75,-10.75zM86,125.41667c-14.56267,0 -27.219,-7.955 -34.02017,-19.68683c-1.38317,-2.3865 0.39417,-5.3965 3.14617,-5.3965h61.74083c2.75917,0 4.52933,3.01 3.14617,5.3965c-6.794,11.73183 -19.45033,19.68683 -34.013,19.68683z"
        ></path>
      </g>
    </g>
  </svg>
</template>
<script>
export default {
  props: {
    fill: {
      default: () => {
        return "#ffe142";
      },
    },
  },
};
</script>