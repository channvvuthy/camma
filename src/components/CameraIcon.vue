<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         :width="width" :height="height"
         viewBox="0 0 172 172"
         style=" fill:#000000;">
        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
           stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
           font-size="none" text-anchor="none" style="mix-blend-mode: normal">
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g fill="#333333">
                <path d="M101.18718,14.31934l-30.40235,0.02799c-4.00617,0 -7.83787,1.68047 -10.55404,4.63314l-8.88835,9.6862h-22.67578c-7.88333,0 -14.33333,6.45 -14.33333,14.33333v86c0,7.88333 6.45,14.33333 14.33333,14.33333h114.66667c7.88333,0 14.33333,-6.45 14.33333,-14.33333v-86c0,-7.88333 -6.45,-14.33333 -14.33333,-14.33333h-22.63379l-8.94434,-9.71419c-2.71617,-2.95267 -6.5547,-4.63314 -10.56803,-4.63314zM86,50.16667c20.06667,0 35.83333,15.76667 35.83333,35.83333c0,20.06667 -15.76667,35.83333 -35.83333,35.83333c-20.06667,0 -35.83333,-15.76667 -35.83333,-35.83333c0,-20.06667 15.76667,-35.83333 35.83333,-35.83333zM86,64.5c-11.87412,0 -21.5,9.62588 -21.5,21.5c0,11.87412 9.62588,21.5 21.5,21.5c11.87412,0 21.5,-9.62588 21.5,-21.5c0,-11.87412 -9.62588,-21.5 -21.5,-21.5z"></path>
            </g>
        </g>
    </svg>
</template>

<script>
    export default{
        name: "CameraIcon",
        props: {
            width: {
                type: Number,
                default: function () {
                    return 22
                }
            },
            height: {
                type: Number,
                default: function () {
                    return 22
                }
            }
        }
    }
</script>