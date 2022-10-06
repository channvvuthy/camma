<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         :width="size" :height="size"
         viewBox="0 0 172 172"
         style=" fill:#000000;">
        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
           stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
           font-size="none" text-anchor="none" style="mix-blend-mode: normal">
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g fill="#666666">
                <path d="M38.80078,31.07422l-7.72656,7.72656l47.19922,47.19922l-47.19922,47.19922l7.72656,7.72656l47.19922,-47.19922l47.19922,47.19922l7.72656,-7.72656l-47.19922,-47.19922l47.19922,-47.19922l-7.72656,-7.72656l-47.19922,47.19922z"></path>
            </g>
        </g>
    </svg>
</template>

<script>
    export default{
        name: "Close",
        props:{
            size:{

                default:()=>{
                    return 25
                }
            }
        }
    }
</script>