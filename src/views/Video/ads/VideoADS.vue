<template>
    <div class="fixed inset-0 overflow-y-auto font-khmer_os" style="z-index:53">
        <div class="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-black" @click="closeAds"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-opacity-0  overflow-hidden  transform transition-all  sm:align-middle  w-7/12"
                 role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="flex justify-center items-center text-center py-10">
                    <div>
                        <div v-if="loading">
                            <LoadingWhite></LoadingWhite>
                        </div>
                        <div class="relative" v-else>
                            <div class="p-1 w-8 h-8 opacity-60 absolute rounded-full cursor-pointer right-0 -top-10 flex justify-center items-center"
                                 @click="closeAds">
                                <CloseIcon fill="#ffffff"></CloseIcon>
                            </div>
                            <video controls autoplay controllist="nodownload" class="m-auto" :poster="poster">
                                <source src="https://eschool-video.sabay.com/video/Diploma-English/EssentialBook3(Micha)/5f27c1c981768d50365d40d2-2_720.mp4"/>
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CloseIcon from "./../../../components/CloseIcon"
    import LoadingWhite from "./../../../components/LoadingWhite"
    export default{
        components: {
            CloseIcon,
            LoadingWhite
        },
        data(){
            return {
                loading: true,
            }
        },
        props: {
            videoUrl: {
                type: String,
                default: () => {
                    return ""
                }
            },
            poster: {
                type: String,
                default: () => {
                    return ""
                }
            }
        },
        methods: {
            closeAds(){
                this.$emit("closeAds")
            }
        },
        created(){
            let loadUrl = setInterval(() => {
                if (this.videoUrl) {
                    this.loading = false
                    clearInterval(loadUrl)
                }
            })
        }
    }
</script>