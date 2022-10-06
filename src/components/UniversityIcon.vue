<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         :width="width" :height="height"
         viewBox="0 0 172 172"
         style=" fill:#000000;">
        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
           stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
           font-size="none" text-anchor="none" style="mix-blend-mode: normal">
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g fill="#000000">
                <path d="M41.28,12.42969v83.89031h-10.32v-17.2h-6.88v17.2h-10.32v3.44v58.48h58.48h48.16v-119.43922l-10.32,-3.44v-21.60078h-6.88v19.30297l-6.88,-2.29109v-17.01187h-6.88v14.72078zM48.16,21.97703l65.36,21.78219v107.60078h-17.2v-10.81719c5.9023,-1.54758 10.32,-6.89778 10.32,-13.26281c0,-7.55869 -6.20131,-13.76 -13.76,-13.76c-7.55869,0 -13.76,6.20131 -13.76,13.76c0,6.36504 4.4177,11.71523 10.32,13.26281v10.81719h-17.2v-55.04h-24.08zM55.04,41.28v6.88h20.64v-6.88zM127.28,51.6v6.88h24.08v92.88h-24.08v6.88h30.96v-106.64zM55.04,55.04v6.88h51.6v-6.88zM127.28,65.36v10.32h17.2v-10.32zM55.04,68.8v6.88h27.52v-6.88zM89.44,68.8v6.88h17.2v-6.88zM55.04,82.56v6.88h51.6v-6.88zM127.28,82.56v10.32h17.2v-10.32zM79.12,96.32v6.88h27.52v-6.88zM127.28,99.76v10.32h17.2v-10.32zM20.64,103.2h44.72v48.16h-44.72zM27.52,110.08v6.88h10.32v-6.88zM48.16,110.08v6.88h10.32v-6.88zM127.28,116.96v10.32h17.2v-10.32zM92.88,120.4c3.84046,0 6.88,3.03954 6.88,6.88c0,3.84046 -3.03954,6.88 -6.88,6.88c-3.84046,0 -6.88,-3.03954 -6.88,-6.88c0,-3.84046 3.03954,-6.88 6.88,-6.88zM27.52,123.84v6.88h10.32v-6.88zM48.16,123.84v6.88h10.32v-6.88zM127.28,134.16v10.32h17.2v-10.32zM27.52,137.6v6.88h10.32v-6.88zM48.16,137.6v6.88h10.32v-6.88z"></path>
            </g>
        </g>
    </svg>
</template>

<script>
    export default{
        name: "UniversityIcon",
        props: {
            width: {
                type: Number,
                default: function () {
                    return 30
                }
            },
            height: {
                type: Number,
                default: function () {
                    return 30
                }
            }
        }
    }
</script>