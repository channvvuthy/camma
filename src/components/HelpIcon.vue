<template>
    <svg :fill="fill" :width="size" :height="size" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin" class="jam jam-help">
        <path
            d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1.276-3.218a1 1 0 0 1-1.232-1.576l.394-.308a1.5 1.5 0 1 0-1.847-2.364l-.394.308a1 1 0 1 1-1.23-1.576l.393-.308a3.5 3.5 0 1 1 4.31 5.516l-.394.308z" />
    </svg>
</template>

<script>
export default {
    name: "HelpIcon",
    props: {
        fill: {
            default: function () {
                return "#000000"
            }
        },
        size: {
            default: function () {
                return 24
            }
        }
    }
}
</script>