<template>
    <audio controls class="focus:outline-none"
           controlsList="nodownload">
        <source :src="chat.content.value.indexOf('data') === 0?chat.content.value:soundUrl+chat.content.value"
                type="audio/wav">
        Your browser does not support the <code>audio</code>
        element.
    </audio>
</template>
<script>
    import config from "./../../../config"
    export default{
        name: "Audio",
        props: {
            chat: {}
        },
        data(){
            return {
                soundUrl: config.baseUrl + "files/sound/",
            }
        }
    }
</script>