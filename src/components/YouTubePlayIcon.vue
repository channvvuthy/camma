<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
         :width="width" :height="height"
         viewBox="0 0 24 24"
         style=" fill:#000000;">
        <path d="M 3 3 C 1.9069372 3 1 3.9069372 1 5 L 1 15 C 1 16.093063 1.9069372 17 3 17 L 16 17 C 17.093063 17 18 16.093063 18 15 L 18 5 C 18 3.9069372 17.093063 3 16 3 L 3 3 z M 3 5 L 16 5 L 16 15 L 3 15 L 3 5 z M 7 7 L 7 13 L 12 10 L 7 7 z M 20 7 L 20 19 L 5 19 L 5 21 L 20 21 C 21.093063 21 22 20.093063 22 19 L 22 7 L 20 7 z"></path>
    </svg>
</template>

<script>
    export default{
        name: "YouTubePlayIcon",
        props: {
            width: {
                type: Number,
                default: function () {
                    return 24
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