<template>
    <div class="p-5 flex font-khmer_os">
        <div class="w-3/5 pr-5">
            <MediaPlayer :url="`file:///${defaultVideo.url}`" @onPlayerEnded="onPlayerEnded"
                         @previousVideo="previousVideo" @lastWatchVideo="lastWatchVideo($event)"
                         :last_watch="last_watch"></MediaPlayer>
            <div class="mt-3 text-14px font-semibold">{{defaultVideo.title}}</div>
            <div class="text-gray-400 text-14px font-khmer_os">{{defaultVideo.course.teacher.name}}</div>
        </div>
        <div class="w-2/5 bg-white h-screen border border-gray-200 h-screen">
            <div class="overflow-y-scroll pt-5 pb-20" style="height: 91vh;">
                <div class="relative flex items-center cursor-pointer"
                     :class="defaultVideo._id === course._id?'bg-gray-300 py-2':' py-1'"
                     v-for="(course, key) in downloadDetails" :key="key">
                    <div id="vdActive" class="absolute left-0 h-full flex justify-center items-center pl-3"
                         v-if="order == course.order">
                        <IconPlayActive/>
                    </div>
                    <div class="relative ml-7">
                        <img :src="getPathFromUrl(course.thumbnail)" alt="" class="w-40"
                             :id="course.video_youtube"
                             @click="nextOrder(course,key)">
                        <input type="range" min="0" max="100" value="100" step="1"
                               class="w-40 percentage cursor-default absolute bottom-0 left-0"
                               v-if="course.last_watch"
                               :id="course._id"
                               :style="lastWatchMark(course.last_watch.percentage)">
                    </div>
                    <div class="flex-1 font-khmer_os text-sm pl-3" :title="course.title"
                         @click="nextOrder(course,key)">
                        <div class="flex-cols">
                            <p v-html="(key + 1 ) + ',' + cutString(course.title, window.width <= 1366?25:55)"></p>
                            <div class="mt-3 text-14px text-gray-500 flex">
                                <div class="opacity-60">
                                    <ViewIcon/>
                                </div>
                                <span class="pl-1">{{kFormatter(course.view)}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="pr-3 cursor-pointer" @click="askForRemove(course)">
                        <CloseIcon :width="22" :height="22" fill="#DC2626"></CloseIcon>
                    </div>
                </div>
            </div>
        </div>
        <MessageConfirm v-if="showConfirm" @closeConfirm="closeConfirm" @confirmDelete="confirmDelete"></MessageConfirm>
    </div>
</template>
<script>
    import {mapState} from "vuex"
    import MediaPlayer from "./components/media/Player"
    import helper from "./../../helper/helper"
    import ViewIcon from "./../../components/ViewIcon.vue"
    import CloseIcon from "./../../components/CloseIcon.vue"
    import IconPlayActive from "./../../components/IconPlayActive"
    import MessageConfirm from "./../MyCourse/components/MessageConfirm"
    const {ipcRenderer} = require('electron')

    export default{
        name: "VideoDetail",
        components: {
            MediaPlayer,
            ViewIcon,
            CloseIcon,
            IconPlayActive,
            MessageConfirm
        },
        data(){
            return {
                defaultVideo: {},
                showConfirm: false,
                last_watch: 0,
                removeVideo: "",
                order: 1,
                window: {
                    width: 0,
                    height: 0
                },
            }
        },
        computed: {
            ...mapState('course', ['downloadDetails'])
        },
        methods: {
            getDefaultVideo(video = "", key = null){
                if (key === null) {
                    if (this.downloadDetails[0].index !== undefined) {
                        key = this.downloadDetails[0].index
                    } else {
                        key = 0
                    }
                }

                if (video === "") {
                    this.defaultVideo = this.downloadDetails[key]
                    this.order = this.defaultVideo.order
                } else {
                    this.defaultVideo = video
                    this.order = key
                }

                let downloaded = this.getItem("downloaded");

                downloaded = downloaded.filter(item => {
                    if (item.course._id === this.downloadDetails[key].course._id) {
                        item['index'] = key
                    }
                    return item
                });
                this.setItem("downloaded", downloaded)


                if (this.defaultVideo.last_watch && this.defaultVideo.last_watch !== undefined) {
                    this.last_watch = this.defaultVideo.last_watch.mark
                }
            },
            getPathFromUrl(url) {
                return url.split("?")[0];
            },
            lastWatchMark(percentage){
                return `background: linear-gradient(90deg, rgb(255, 14, 9) ${percentage}%, rgb(214, 214, 214) 0%)`;
            },
            previousVideo(){
                for (let i = 0; i < this.downloadDetails.length; i++) {
                    if (this.downloadDetails[i]._id === this.defaultVideo._id) {
                        if (i > 0) {
                            if (this.downloadDetails[parseInt(i) - 1] !== undefined) {
                                this.downloadDetails[i]['index'] = (parseInt(i) - 1)
                                this.getDefaultVideo((this.downloadDetails[parseInt(i) - 1]))
                                return
                            }
                        }
                    }
                }
            },
            onPlayerEnded(){
                let downloaded = this.getItem("downloaded");

                for (let i = 0; i < this.downloadDetails.length; i++) {
                    if (this.downloadDetails[i]._id === this.defaultVideo._id) {
                        if (this.downloadDetails[parseInt(i) + 1] !== undefined) {
                            this.getDefaultVideo((this.downloadDetails[parseInt(i) + 1]))
                            downloaded = downloaded.filter(item => {
                                if (item.course._id === this.downloadDetails[parseInt(i) + 1].course._id) {
                                    return item['index'] = parseInt(i) + 1
                                }
                                return item
                            });
                            this.setItem("downloaded", downloaded)
                            return
                        }
                    }
                }


            },
            getItem(item){
                if (!localStorage.getItem(item)) {
                    return;
                }
                return JSON.parse(localStorage.getItem(item))
            },
            setItem(item, value){
                localStorage.setItem(item, JSON.stringify(value))
            },
            askForRemove(video){
                this.showConfirm = true
                this.removeVideo = video
            },
            confirmDelete(){
                this.showConfirm = false
                let downloaded = this.downloadDetails.filter(item => item._id !== this.removeVideo._id)
                this.$store.commit('course/getDownloadDetail', downloaded)
                ipcRenderer.send("removeDownload", this.removeVideo._id)
                let oldDownloaded = this.getItem("downloaded");

                if (oldDownloaded) {
                    oldDownloaded = oldDownloaded.filter(item => item._id !== this.removeVideo._id)
                    this.setItem('downloaded', oldDownloaded)
                }

                if (downloaded.length <= 0) {
                    this.$router.push('download')
                }

            },
            closeConfirm(){
                this.showConfirm = false
            },
            nextOrder(video, key){
                this.getDefaultVideo(video, key)
            },
            lastWatchVideo($event){
                let percentage = Math.round(($event.mark * 100) / $event.duration)
                $event.percentage = percentage
                if (percentage === 100) {
                    $event.mark = 0
                }

                let download = JSON.parse(localStorage.getItem('downloaded'))

                download = download.filter(item => {
                    if (item._id === this.defaultVideo._id) {
                        item.last_watch = $event
                    }
                    return item
                })

                let downloadDetail = download.filter(item => item.course._id === this.defaultVideo.course._id)

                this.$store.commit('course/getDownloadDetail', downloadDetail)

                localStorage.setItem("downloaded", JSON.stringify(download))

            },
            kFormatter(num){
                return helper.kFormatter(num)
            },
            cutString(text, limit){
                if (!text) {
                    return
                }
                return helper.cutString(text, limit)
            },
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },

        created(){
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
            this.getDefaultVideo()
        }
    }
</script>
<style scoped>
    .percentage {
        -webkit-appearance: none;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, rgb(255, 14, 9) 0%, rgb(255, 255, 255) 0%);
        outline: none;
        box-shadow: 0px 1px 10px black;
        cursor: pointer;
    }

    .percentage {
        height: 3px;
        background: #fffffff;
        box-shadow: none;
    }

    .percentage::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background: #ff0e09;
        cursor: pointer;
    }

</style>
