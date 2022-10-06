<template>
    <div class="home p-5 bg-gray-50 text-left">
        <div v-if="loadingVideoCourse" class="flex justify-center items-center h-screen relative -top-5">
            <h1 class="text-sm font-semibold font-khmer_os relative -top-20">
                <loading></loading>
            </h1>
        </div>
        <div class="overflow-y-scroll pt-3 -mt-3 " style="max-height: 100vh" @scroll="onScroll"
             id="videoList" v-else>
            <div class="h-screen flex justify-center items-center" v-if="videoCourses.length <= 0">
                <img src="/icon/Empty/Empty.svg" class="w-64  mb-5 relative -top-28"/>
            </div>
            <div class="grid grid-cols-4 gap-4 mb-40">
                <div class="flex-col mb-5 relative cursor-pointer" v-for="(video, key) in videoCourses" :key="key">
                    <div>
                        <div v-if="video.is_new" class="absolute right-0 top-0 z-50"
                             style="margin-top:-8px; margin-right: -8px;">
                            <img src="/icon/New/New.png" class="w-10"/>
                        </div>
                        <div :id="video._id" class="clear-both">
                            <div @click="goToPlayList(video)" class="relative">
                                <img :src="video.thumbnail" class="w-full">
                                <input type="range" min="0" max="100" value="100" step="1"
                                       class="w-full percentage cursor-default absolute bottom-0 left-0"
                                       v-if="video.last_watch"
                                       :style="lastWatchMark(video.last_watch.percentage)">
                            </div>
                            <div class="absolute flex justify-start items-center font-khmer_os -bottom-1 mb-17 left-0 bg-white w-full bg-opacity-60 h-8">
                                <img :src="video.teacher.photo" alt="teacher"
                                     class="rounded-full h-10 shadow ml-3">
                                <span class="text-14px ml-2">{{video.teacher.name}}</span>
                            </div>
                        </div>
                        <div class="flex justify-between">
                            <div class="flex-cols">
                                <div class="font-khmer_os text-14px mt-3 font-semibold text-gray-700"
                                     v-html="cutString(video.title, window.width <= 1366?30:45)"
                                     @click="goToPlayList(video)"></div>
                                <div class="flex">
                                    <del class="mr-2" v-if="video.price.discount">${{video.price.discount}}</del>
                                    <span class="text-red-700" v-if="video.price.year">${{video.price.year}}</span>
                                    <span v-if="!video.price.discount && !video.price.year"
                                          class="text-gray-400 font-khmer_os text-14px">
                                        មិនគិតថ្លៃ
                                    </span>
                                </div>
                            </div>
                            <div class="mt-3" v-if="!video.is_in_cart && video.price.year"
                                 @click="addCartToCart(video._id)">
                                <CartIcon :size="20" fill="#F3F4F6"></CartIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ipcRenderer} from 'electron'
    import {mapActions, mapState} from "vuex"
    import helper from "./../../helper/helper"
    import Loading from "./../../components/Loading"
    import moment from "moment"
    import CartIcon from "./../../components/CartIcon"
    export default{
        name: "Video",
        components: {
            Loading,
            CartIcon
        },
        data(){
            return {
                window: {
                    width: 0,
                    height: 0
                },
                page: 1,
                noResult: false,
            }
        },
        computed: {
            ...mapState('course', ['videoCourses', 'loadingVideoCourse','teacher']),
            query(){
                return this.$store.state.course.s
            },
            removedCart(){
                return this.$store.state.cart.removedCart
            },
            gradeID(){
                return this.$store.state.course.gradeID
            }

        },

        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            ...mapActions('course', ['getVideoCourse', 'videoCoursePagination', 'afterAddToCart']),
            ...mapActions('cart', ['addCart', 'getCart']),

            addCartToCart(course_id){
                this.addCart(course_id).then(() => {
                    this.afterAddToCart(course_id)
                    this.getCart()
                })
            },
            lastWatchMark(percentage){
                return `background: linear-gradient(90deg, rgb(255, 14, 9) ${percentage}%, rgb(214, 214, 214) 0%)`;
            },
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },
            onScroll ({target: {scrollTop, clientHeight, scrollHeight}}) {
                if (scrollTop + clientHeight >= scrollHeight) {
                    this.page++
                    if (!this.noResult) {
                        this.videoCoursePagination(this.page).then(response => {
                            if (response.length <= 0) {
                                this.noResult = true
                            }
                        })
                    }

                }
            },
            formatDate(date){
                moment.locale('km');
                return moment(date).format('ll');
            },
            cutString(text, limit){
                return helper.cutString(text, limit)
            },
            goToPlayList(video){
                this.$store.commit("course/getTeacherInfo", video.teacher)

                let order = 1;

                if (video.last_watch && video.last_watch.order) {
                    order = video.last_watch.order
                }

                this.$router.push({
                    name: 'course-detail',
                    params: {videoId: video._id, order: order, courseId: video._id}
                })
            },

        },
        created(){
            window.addEventListener('resize', this.handleResize);
            this.handleResize();

            this.getVideoCourse()
            ipcRenderer.on('resetGrade', () => {
                this.page = 1
            })
        },
        watch: {
            query: function () {
                this.getVideoCourse()
            },
            gradeID: function () {
                this.getVideoCourse()
            },
            removedCart: function (course_id) {
                this.afterAddToCart(course_id)
            }
        }
    }

</script>

<style>
    #videoList::-webkit-scrollbar {
        width: 5px !important;
    }

    #videoList::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3) !important;
    }

    #videoList::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.5) !important;
    }
</style>