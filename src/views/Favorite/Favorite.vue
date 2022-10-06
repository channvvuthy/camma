<template>
    <div>
        <div class="home p-5 bg-gray-50 h-screen">
            <div v-if="loading" class="flex justify-center items-center h-screen relative -top-5">
                <h1 class="text-sm font-semibold font-khmer_os relative -top-20">
                    <loading></loading>
                </h1>
            </div>
            <div style="max-height: 100vh;overflow-y: scroll" @scroll="onScroll"
                 id="feed" v-else>
                <div v-if="!favorites.length" class="flex justify-center items-center h-screen">
                    <img src="/icon/Empty/Empty.svg" class="w-64  mb-5 relative -top-28"/>
                </div>
                <div class="grid grid-cols-4 gap-4 mb-40">
                    <div class="flex-col mb-5" v-for="(video, key) in favorites" :key="key">
                        <div class="relative">
                            <div class="absolute right-0 top-0 w-6 mt-2 mr-2 bg-gray-50 cursor-pointer bg-opacity-75"
                                 style="border-radius:2px;z-index:50;">
                                <img src="/icon/MenuSidebar/FavouriteFull.png" class="max-w-full"
                                     @click="removeFav(video._id)"/>
                            </div>
                            <div @click="courseDetail('course-detail',video._id, video.order,video.course._id)"
                                 class=" cursor-pointer">
                                <div :id="video._id" class="relative">
                                    <img :src="video.thumbnail" alt="">
                                    <input type="range" min="0" max="100" value="100" step="1"
                                           class="w-full percentage cursor-default absolute bottom-0 left-0"
                                           v-if="video.last_watch"
                                           :style="lastWatchMark(video.last_watch.percentage)">
                                </div>
                                <div class="font-khmer_os text-14px mt-4 font-semibold text-gray-700"
                                     v-html="cutString(video.title, window.width <= 1366?30:45)"></div>
                                <h2 class="text-gray-400 text-14px font-khmer_os mt-2">{{video.teacher.name}}</h2>
                                <div class="flex">
                                    <div class="mt-3 text-14px text-gray-500">
                                        <Eye/>
                                        <span class="pl-2">{{kFormatter(video.view)}}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center items-end" :style="{visibility:paginationLoading?'visible':'hidden'}">
                    <loading></loading>
                </div>
            </div>
            <Message v-if="showMessageErr" @close="close" @deleteFavorite="deleteFavorite"></Message>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex"
    import helper from "../../helper/helper";
    import Eye from "./../../components/Eye"
    import Loading from "./../../components/Loading.vue"
    import Message from "./components/Message"
    export default{
        name: "Favorite",
        components: {
            Eye,
            Loading,
            Message
        },

        data(){
            return {
                window: {
                    width: 0,
                    height: 0
                },
                page: 1,
                showMessageErr: false,
                id: null,
                noResult:false,
            }
        },
        computed: {
            ...mapState('favorite', ['loading', 'favorites', 'paginationLoading']),
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            ...mapActions('favorite', ['getFavorite', 'removeFavorite', 'favoritePagination']),

            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },

            onScroll ({target: {scrollTop, clientHeight, scrollHeight}}) {
                if (scrollTop + clientHeight >= scrollHeight) {
                    this.page++
                    if(!this.noResult){
                        this.favoritePagination(this.page).then(response =>{
                            if(response.length <=0){
                                this.noResult = true
                            }
                        })
                    }
                    
                } else {
                    this.pagesLoading = false
                }
            },
            cutString(text, limit){
                return helper.cutString(text, limit)
            },
            kFormatter(num){
                return helper.kFormatter(num)
            },
            courseDetail(name, videoId, order, courseId){
                this.$router.push({name: name, params: {videoId: videoId, order: order, courseId: courseId}})
            },

            close(){
                this.showMessageErr = false
            },
            removeFav(id){
                this.id = id
                this.showMessageErr = true
            },
            lastWatchMark(percentage){
                return `background: linear-gradient(90deg, rgb(255, 14, 9) ${percentage}%, rgb(214, 214, 214) 0%)`;
            },
            deleteFavorite(){
                this.removeFavorite(this.id).then(() => {
                    this.showMessageErr = false
                })
            }
        },

        created(){
            window.addEventListener('resize', this.handleResize);
            this.handleResize();

            this.getFavorite()

        }
    }
</script>
<style>
    #feed::-webkit-scrollbar {
        width: 5px !important;
    }
    #feed::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3) !important;
    }

    #feed::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.5) !important;
    }
</style>