<template>
    <div class="min-h-36">
        <div class="overflow-hidden cursor-pointer flex w-72" @click="imageDetail()" :class="`justify-${justify}`">
            <img :src="imgUrl+chat.content.value" class="max-w-full max-h-36 shadow rounded"/>
        </div>
        <ImageFull v-if="showImageFull" :Url="imgUrl+chat.content.value" @hideFullImage="hideFullImage"></ImageFull>
    </div>
</template>
<script>
    import config from "./../../../config"
    import ImageFull from "./ImgFull"
    export default{
        name: "ImageView",
        components: {
            ImageFull
        },
        props: {
            chat: {},
            justify: {
                type: String,
                default: () => {
                    return "start"
                }
            }
        },
        data(){
            return {
                imgUrl: config.baseUrl + "files/img/",
                showImageFull: false
            }
        },
        methods: {
            imageDetail(){
                this.showImageFull = true
            },
            hideFullImage(){
                this.showImageFull = false
            }
        }
    }
</script>