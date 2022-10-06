<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         width="25" height="25"
         viewBox="0 0 172 172"
         style=" fill:#000000;">
        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
           stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
           font-size="none" text-anchor="none" style="mix-blend-mode: normal">
            <path d="M0,172v-172h172v172z" fill="none"></path>
            <g fill="#3498db">
                <path d="M16.60517,74.046l28.53767,28.53767c2.82367,2.82367 7.32433,3.03867 10.39883,0.50167l76.3465,-62.96633l-62.96633,76.33933c-2.537,3.0745 -2.322,7.58233 0.50167,10.39883l28.53767,28.53767c4.00617,4.00617 10.8145,2.494 12.7495,-2.83083l46.483,-127.83183c2.24317,-6.17767 -3.741,-12.169 -9.91867,-9.91867l-127.839,46.483c-5.32483,1.935 -6.837,8.74333 -2.83083,12.7495z"></path>
            </g>
        </g>
    </svg>
</template>
<script>
    export default{
        name: "SendMessageIcon",
        props: {
            size: {
                type: Number,
                default: () => {
                    return 35;
                }
            }
        }
    }
</script>