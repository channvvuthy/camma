<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" :width="width" :height="height" viewBox="0 0 172 172"
        style=" fill:#000000;">
        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
            stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
            font-size="none" text-anchor="none" style="mix-blend-mode: normal">
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g :fill="fill">
                <path
                    d="M42.93001,35.76335c-2.91628,0.00077 -5.54133,1.76841 -6.63871,4.47035c-1.09737,2.70194 -0.44825,5.79937 1.64164,7.83336l37.93295,37.93294l-37.93295,37.93294c-1.8722,1.79752 -2.62637,4.46674 -1.97164,6.97823c0.65473,2.51149 2.61604,4.4728 5.12753,5.12753c2.51149,0.65473 5.18071,-0.09944 6.97823,-1.97165l37.93294,-37.93294l37.93294,37.93294c1.79752,1.87223 4.46675,2.62641 6.97825,1.97168c2.5115,-0.65472 4.47282,-2.61605 5.12755,-5.12755c0.65472,-2.5115 -0.09946,-5.18073 -1.97168,-6.97825l-37.93294,-37.93294l37.93294,-37.93294c2.11962,-2.06035 2.75694,-5.21064 1.60486,-7.93287c-1.15207,-2.72224 -3.85719,-4.45797 -6.81189,-4.37084c-1.86189,0.05548 -3.62905,0.83363 -4.92708,2.1696l-37.93294,37.93295l-37.93294,-37.93295c-1.34928,-1.38698 -3.20203,-2.16948 -5.13704,-2.1696z">
                </path>
            </g>
        </g>
    </svg>
</template>

<script>
export default {
    props: {
        fill: {
            type: String,
            default: function () {
                return "#333333"
            }
        },
        width: {
            type: Number,
            default: function () {
                return 24;
            }
        },
        height: {
            type: Number,
            default: function () {
                return 24;
            }
        }
    }
}
</script>