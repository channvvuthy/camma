<template>
    <div>
        <iframe :src="link" class="w-full h-screen"></iframe>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                link: "",
            }
        },
        created(){
            this.link = this.$route.params.link
        }
    }
</script>