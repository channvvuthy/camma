<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         :width="width" :height="height"
         viewBox="0 0 172 172"
         style=" fill:#000000;">
        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
           stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
           font-size="none" text-anchor="none" style="mix-blend-mode: normal">
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g fill="#ffffff">
                <path d="M10.32,0c-5.65719,0 -10.32,4.66281 -10.32,10.32v151.36c0,5.65719 4.66281,10.32 10.32,10.32h116.96c5.65719,0 10.32,-4.66281 10.32,-10.32v-27.52l-6.88,6.88v20.64c0,1.935 -1.505,3.44 -3.44,3.44h-116.96c-1.935,0 -3.44,-1.505 -3.44,-3.44v-151.36c0,-1.94844 1.49156,-3.44 3.44,-3.44h116.96c1.935,0 3.44,1.505 3.44,3.44v20.64l6.88,6.88v-27.52c0,-5.65719 -4.66281,-10.32 -10.32,-10.32zM130.1825,45.0425c-1.29,0.22844 -2.32469,1.16906 -2.6875,2.41875c-0.36281,1.26313 0.01344,2.60688 0.9675,3.49375l31.605,31.605h-101.5875c-0.1075,0 -0.215,0 -0.3225,0c-1.89469,0.09406 -3.37281,1.70656 -3.27875,3.60125c0.09406,1.89469 1.70656,3.37281 3.60125,3.27875h101.5875l-31.605,31.605c-1.02125,0.83313 -1.49156,2.16344 -1.19594,3.45344c0.29562,1.27656 1.30344,2.28438 2.58,2.58c1.29,0.29563 2.62031,-0.17469 3.45344,-1.19594l37.5175,-37.41l2.365,-2.4725l-2.365,-2.4725l-37.5175,-37.41c-0.71219,-0.76594 -1.74687,-1.15562 -2.795,-1.075c-0.1075,0 -0.215,0 -0.3225,0z"></path>
            </g>
        </g>
    </svg>
</template>

<script>
    export default{
        name: "LogoutIcon",
        props: {
            width: {
                type: Number,
                default: function () {
                    return 40;
                }
            },
            height: {
                type: Number,
                default: function () {
                    return 40;
                }
            },
            fill: {
                type: String,
                default: function () {
                    return "000000"
                }
            }
        }
    }
</script>