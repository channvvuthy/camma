<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         :width="width" :height="height"
         viewBox="0 0 172 172"
         style=" fill:#000000;">
        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
           stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
           font-size="none" text-anchor="none" style="mix-blend-mode: normal">
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g :fill="fill">
                <path d="M86,10.75c-16.48786,0 -39.93488,5.59094 -52.36426,8.75537c-7.1207,1.81225 -12.13574,8.28784 -12.13574,15.62109v34.74854c0,26.60241 15.77982,49.14212 31.05322,65.0459c15.2734,15.90378 30.59131,25.51026 30.59131,25.51026l2.89746,1.80567l2.85547,-1.84766c0,0 15.29051,-9.82009 30.54932,-25.8252c15.25882,-16.00511 31.05322,-38.49725 31.05322,-64.68896v-34.74854c0,-7.33562 -5.01259,-13.79345 -12.11474,-15.62109h-0.02099c-12.42887,-3.16443 -35.8764,-8.75537 -52.36426,-8.75537zM86,21.5c13.90742,0 37.54817,5.3268 49.69776,8.41943c2.42234,0.62336 4.05224,2.71715 4.05224,5.20703v34.74854c0,21.77479 -13.76809,42.27407 -28.07178,57.27734c-12.86419,13.49336 -23.24469,20.13887 -25.69922,21.77295c-2.45134,-1.59555 -12.80644,-8.05585 -25.65723,-21.43702c-14.2891,-14.87885 -28.07178,-35.34619 -28.07178,-57.61328v-34.74854c0,-2.51375 1.60595,-4.58978 4.03125,-5.20703c12.14512,-3.09207 35.80561,-8.41943 49.71875,-8.41943zM125.1997,45.91846l-45.91845,45.91846l-24.41846,-24.41846l-7.60059,7.60059l32.01904,32.01904l53.51905,-53.51904z"></path>
            </g>
        </g>
    </svg>
</template>

<script>
    export default{
        name: "TermAndConditionIcon",
        props: {
            fill: {
                type: String,
                default: function () {
                    return "#000000"
                }
            },
            width: {
                type: Number,
                default: function () {
                    return 24
                }
            },
            height: {
                type: Number,
                default: function () {
                    return 24
                }
            }
        }
    }
</script>