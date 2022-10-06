<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         :width="size" :height="size"
         viewBox="0 0 172 172"
         style=" fill:#000000;">
        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
           stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
           font-size="none" text-anchor="none" style="mix-blend-mode: normal">
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g :fill="fill">
                <path d="M86,26.875c-2.28437,0 -4.03125,1.74687 -4.03125,4.03125v79.0125l-20.02188,-20.02187c-1.6125,-1.6125 -4.16562,-1.6125 -5.64375,0c-1.6125,1.6125 -1.6125,4.16562 0,5.64375l26.875,26.875c0.80625,0.80625 1.88125,1.20938 2.82188,1.20938c0.94062,0 2.01563,-0.40312 2.82187,-1.20938l26.875,-26.875c1.6125,-1.6125 1.6125,-4.16562 0,-5.64375c-1.6125,-1.6125 -4.16562,-1.6125 -5.64375,0l-20.02187,20.02187v-79.0125c0,-2.28438 -1.74688,-4.03125 -4.03125,-4.03125zM131.95625,152.91875c0,-2.28437 -1.74688,-4.03125 -4.03125,-4.03125h-83.85c-2.28437,0 -4.03125,1.74688 -4.03125,4.03125c0,2.28438 1.74688,4.03125 4.03125,4.03125h83.85c2.28438,0 4.03125,-1.88125 4.03125,-4.03125z"></path>
            </g>
        </g>
    </svg>
</template>
<script>
    export default{
        name: "DownloadLessonIcon",
        props: {
            fill:{
                type:String,
                default:() =>{
                    return "#000000"
                }
            },
            size: {
                default: () => {
                    return "26"
                }
            }
        }
    }
</script>