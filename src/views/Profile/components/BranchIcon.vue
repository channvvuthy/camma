<template>
    <svg :fill="fill" :width="size" :height="size" viewBox="0 0 36 36" version="1.1"
        preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>bank-line</title>
        <path d="M3.5,13.56,18,5.23l14.5,8.33a1,1,0,0,0,1-1.73L18,2.92,2.5,11.83a1,1,0,1,0,1,1.73Z"
            class="clr-i-outline clr-i-outline-path-1" />
        <path d="M4,26a1,1,0,0,0,1,1H31a1,1,0,0,0,0-2H28V17.63H26V25H19V17.63H17V25H10V17.63H8V25H5A1,1,0,0,0,4,26Z"
            class="clr-i-outline clr-i-outline-path-2" />
        <rect x="5.02" y="14" width="26" height="2" class="clr-i-outline clr-i-outline-path-3" />
        <path d="M33,29H3a1,1,0,0,0,0,2H33a1,1,0,0,0,0-2Z" class="clr-i-outline clr-i-outline-path-4" />
        <path d="M22.15,11.58h3.21L18.65,7.72a.8.8,0,0,0-.8,0l-6.72,3.86h3.21l3.9-2.24Z"
            class="clr-i-outline clr-i-outline-path-5" />
        <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
    </svg>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: function () {
                return 24
            }
        },
        fill: {
            type: String,
            default: function () {
                return "#000000"
            }
        },
    }
}
</script>