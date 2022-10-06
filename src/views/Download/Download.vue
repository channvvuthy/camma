<template>
    <div :class="downloaded.length<=0?`flex flex-col p-5`:`p-5`">
        <div class="flex items-center pb-5 font-khmer_os text-14px">
            <div class="cursor-pointer rounded-full border border-gray-200 hover:bg-gray-200 px-3 py-1 flex justify-center items-center mr-5"
                 :class="active ==1?'bg-gray-300':'bg-gray-100 '" @click="filtterDocument(1)">
                <h2>វីដេអូ</h2>
            </div>
            <div class="cursor-pointer rounded-full border border-gray-200 hover:bg-gray-200 px-3 py-1 flex justify-center items-center"
                 :class="active ==2?'bg-gray-300':'bg-gray-100 '" @click="filtterDocument(2)">
                <span>សៀវភៅ</span>
            </div>
        </div>

        <div class="h-screen flex justify-center items-center" v-if="downloaded.length <= 0 || active ===2">
            <img src="/icon/Empty/Empty.svg" class="w-64  mb-5 relative -top-28"/>
        </div>
        <div class="flex justify-start font-khmer_os" v-else>
            <div class="grid grid-cols-4 gap-4" v-if="active == 1">
                <div class="flex-col mb-5 relative cursor-pointer m-h-20" v-for="(video, key) in downloaded" :key="key">
                    <div class="relative cursor-pointer" @click="downloadDetail(video)">
                        <img :src="getPathFromUrl(video.thumbnail)" class="w-full"/>
                        <div class="absolute flex justify-start items-center font-khmer_os -bottom-1 mb-12 left-0 bg-white w-full bg-opacity-60 h-8">
                            <img :src="video.course.teacher.photo" alt="teacher"
                                 class="rounded rounded-full h-10 shadow ml-3">
                            <span class="text-14px ml-2">{{video.course.teacher.name}}</span>
                        </div>
                        <div class="mt-3" v-html="cutString(video.title, window.width <= 1366?20:45)"></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import helper from "./../../helper/helper"
    export default{
        name: "Download",
        data(){
            return {
                downloaded: [],
                active: 1,
                window: {
                    width: 0,
                    height: 0
                },
            }
        },
        methods: {
            getPathFromUrl(url) {
                return url.split("?")[0];
            },
            cutString(text, limit){
                return helper.cutString(text, limit)
            },
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },
            downloadDetail(video){
                let downloadDetail = JSON.parse(localStorage.getItem('downloaded'))
                downloadDetail = downloadDetail.filter(item => item.course._id === video.course._id)
                this.$store.commit('course/getDownloadDetail', downloadDetail)
                this.$router.push('download-detail')
            },
            filtterDocument(active){
                this.active = active
            }
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        created(){
            window.addEventListener('resize', this.handleResize);
            this.handleResize();

            if (localStorage.getItem("downloaded")!==null) {
                let downloaded = JSON.parse(localStorage.getItem('downloaded'))
                downloaded = downloaded.filter((value, index, self) => self.findIndex((m) => m.course._id === value.course._id) === index)
                this.downloaded = downloaded
            }
        }

    }
</script>