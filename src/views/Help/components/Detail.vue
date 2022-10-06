<template>
    <div class="fixed z-10 inset-0 overflow-y-auto font-khmer_os">
        <div class="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-black" @click="closeDetail()"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-opacity-0  overflow-hidden  transform transition-all  sm:align-middle"
                 role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="content w-100">
                    <div class="relative">
                        <div class="flex justify-end opacity-50 cursor-pointer py-3" @click="closeDetail()" v-if="!loading">
                            <CloseIcon fill="#ffffff"></CloseIcon>
                        </div>
                    </div>
                    <div v-if="loadingHelpDetail" class="flex items-center justify-center">
                        <LoadingWhite></LoadingWhite>
                    </div>
                    <div class="flex items-center justify-center"
                         v-else>
                        <LoadingWhite v-if="loading"></LoadingWhite>
                        <video id="my_video"
                               :class="loading?'hidden':''"
                               class="m-auto focus:outline-none"
                               controls
                               autoplay
                               controlsList="nodownload">
                            <source :src="video"/>
                        </video>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import LoadingWhite from "./../../../components/LoadingWhite"
    import CloseIcon from "./../../../components/CloseIcon"
    import {mapActions, mapState} from "vuex"
    const {ipcRenderer} = require('electron')
    export default{
        name: "Detail",
        components: {
            LoadingWhite,
            CloseIcon
        },
        data(){
            return {
                video: "",
                loading: false,
                loadingHelpDetail: false,
            }
        },
        props: {
            youTubeId: {
                type: String,
                default: () => {
                    return ""
                }
            },
            title: {
                type: String,
                default: () => {
                    return ""
                }
            }
        },
        computed: {
            ...mapState('help', ['youtube_url'])
        },
        methods: {
            ...mapActions('help', ['helpDetail']),
            closeMessage($event){
                this.$emit("closeMessage", $event);
            },
            closeDetail(){
                this.$emit('closeDetail')
            },
            getVideo(){
                this.loading = true
                let myVideo = setInterval(() => {
                    if (document.getElementById("my_video") !== null) {
                        let video = document.getElementById("my_video")
                        video.addEventListener("canplay", () => {
                            this.loading = false
                        })
                        clearInterval(myVideo)
                    }
                }, 100)
            },
        },
        created(){
            this.getVideo()
            this.loadingHelpDetail = true
            ipcRenderer.on("youtubeVideo", (event, arg) => {
                this.video = arg.filter(item => item.itag === 22).map(item => item.url)[0]
                this.loadingHelpDetail = false
            })
        }
    }
</script>
<style>
    #my_video {
        max-height: 100%;
    }
</style>