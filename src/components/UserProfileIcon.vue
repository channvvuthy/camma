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
                <path d="M13.90265,152.15385c0,0 0,-9.92308 0,-11.24099c0,-14.54867 21.8101,-27.77944 45.63581,-32.43088c0,0 7.28726,-3.95373 5.29747,-11.24099c-7.28726,-9.25121 -9.27704,-19.17428 -9.27704,-19.17428c-1.31791,-0.67187 -3.30769,-1.98978 -4.6256,-3.30769c-1.98978,-2.66165 -4.6256,-10.59495 -3.95372,-16.53846c0.64603,-5.29747 1.96394,-3.30769 2.63581,-4.6256c-5.29747,-11.91287 -2.63581,-27.13342 3.30769,-38.3744c12.5589,-21.83594 39.02044,-15.22055 43,-7.28726c25.14363,-4.6256 24.47176,35.06671 20.51803,44.98978c0,0 1.96394,0.67188 1.96394,9.92308c-0.64604,9.92308 -8.57933,15.86659 -8.57933,15.86659c0,2.66165 -3.30769,10.59495 -8.60517,17.88221c-4.6256,9.2512 4.6256,11.24098 4.6256,11.24098c23.82572,4.6256 45.63582,17.85637 45.63582,32.40505c0,1.31791 0,11.24099 0,11.24099c0,9.27704 -35.71274,19.20012 -68.78967,19.20012c-32.40504,0 -68.78966,-3.30769 -68.78966,-18.52824z"></path>
            </g>
        </g>
    </svg>
</template>

<script>
    export default{
        name: "UserProfileIcon",

        props: {
            width: {
                type: Number,
                default: function () {
                    return 26;
                }
            },
            height: {
                type: Number,
                default: function () {
                    return 26;
                }
            },
            fill:{
                type: String,
                default: function(){
                    return "#000000"
                }
            }
        }
    }
</script>