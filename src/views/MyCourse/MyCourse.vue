<template>
    <div class="my-course font-khmer_os text-14px">
        <div class="flex items-center p-5">
            <div class="cursor-pointer rounded-full border border-gray-200 hover:bg-gray-200 px-3 py-1 flex justify-center items-center mr-5"
                 :class="active ==1?'bg-gray-300':'bg-gray-100 '"
                 @click="courseFilter(1)">
                <h2>វីដេអូ</h2>
            </div>
            <div class="cursor-pointer rounded-full border border-gray-200 hover:bg-gray-200 px-3 py-1 flex justify-center items-center"
                 :class="active ==2?'bg-gray-300':'bg-gray-100 '"
                 @click="courseFilter(2)">
                <span>សៀវភៅ</span>
            </div>
        </div>
        <div class="px-5">
            <div v-if="loadingCourse " class="flex justify-center items-center h-screen relative -top-5">
                <h1 class="text-sm font-semibold font-khmer_os relative -top-32">
                    <loading></loading>
                </h1>
            </div>
            <div class="flex justify-center items-center  h-screen" v-if="!myCourses.length">
                <div class="text-center relative -top-40">
                    <img src="/icon/Empty/Empty.svg" class="w-64  mb-5"/>
                </div>
            </div>
            <div class="overflow-y-scroll max-h-screen pb-96">
                <div class="grid gap-4" v-if="!loadingCourse"
                     :class="active ==1?'grid-cols-4':'grid-cols-6'">
                    <template v-if="active === 1">
                        <div class="flex-col mb-5 cursor-pointer relative" v-for="(video, key) in myCourses" :key="key"
                             @click="goToPlayList(video)">
                            <div class="relative" :id="video._id">
                                <img :src="video.thumbnail" class="w-full">
                                <input type="range" min="0" max="100" value="100" step="1"
                                       class="w-full percentage cursor-default absolute bottom-0 left-0"
                                       v-if="video.last_watch"
                                       :style="lastWatchMark(video.last_watch.percentage)">
                                <div class="absolute flex justify-start items-center font-khmer_os left-0  bg-white w-full bg-opacity-60 h-8 bottom-3">
                                    <img :src="video.teacher.photo" alt="teacher"
                                         class="rounded rounded-full h-10 shadow ml-3">
                                    <span class="text-14px ml-2">{{video.teacher.name}}</span>
                                </div>
                            </div>
                            <div class="font-khmer_os text-14px mt-3 font-semibold text-gray-700"
                                 v-html="cutString(video.title, window.width <= 1366?30:45)"></div>
                            <div class="flex">
                                <div class="mt text-14px text-gray-500">
                                    <span class="font-khmer_os">{{formatDate(video.deadline)}}</span></div>
                            </div>
                        </div>
                    </template>
                    <template v-if="active === 2">
                        <div class="flex-col mb-5 cursor-pointer relative shadow justify-center text-center pb-2"
                             v-for="(video, key) in myCourses" :key="key"
                             @click="viewBook(video)">
                            <div>
                                <img :src="video.thumbnail" class="m-auto w-full"/>
                            </div>
                            <div class="flex justify-center items-centers ">
                                <div class="mt text-14px text-gray-500 mt-2 align-bottom">
                                    <span class="font-khmer_os  text-14px align-bottom">ផុត {{formatDate(video.deadline)}}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <ViewBook v-if="showView" :view="bookDetail" @closeView="closeView" :loading="loading" @read="read"></ViewBook>
        <ReadingBook v-if="showReading" :books="bookReading" @closeReading="closeReading"></ReadingBook>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex"
    import helper from "./../../helper/helper"
    import moment from "moment"
    import ViewBook from "./components/View"
    import ReadingBook from "./../Book/components/Read"
    import Loading from "./../../components/Loading"

    export default{
        name: "MyCourse",
        components: {
            ViewBook,
            ReadingBook,
            Loading
        },
        data(){
            return {
                window: {
                    width: 0,
                    height: 0
                },
                active: 1,
                showView: false,
                showReading: false,
                loading: false,
                bookReading: "",
                bookDetail: {}
            }
        },

        computed: {
            ...mapState('course', ['myCourses', 'loadingCourse']),
            query(){
                return this.$store.state.course.s
            },

            gradeID(){
                return this.$store.state.course.gradeID
            }
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            ...mapActions('course', ['myCourseList', 'filterByQueryString', 'readBook', 'setLessonTitle']),
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },

            viewBook(book){
                this.bookDetail = book
                this.showView = true
            },
            closeView(){
                this.bookDetail = {}
                this.showView = false
            },
            closeReading(){
                this.showReading = false
            },

            read($event){
                this.title = $event.title
                this.setLessonTitle(this.title)
                this.loading = true
                this.readBook({course_id: $event.id, order: ''}).then(response => {
                    this.bookReading = response

                    this.loading = false
                    this.showView = false
                    this.showReading = true
                })
            },


            cutString(text, limit){
                return helper.cutString(text, limit)
            },
            formatDate(date){
                moment.locale('km');
                return moment(date).format('ll');
            },
            goToPlayList(video){
                this.$store.commit("course/getTeacherInfo", video.teacher)
                let order = 1;

                if (video.last_watch && video.last_watch.order) {
                    order = video.last_watch.order
                }

                this.$router.push({name: 'course-detail', params: {videoId: video._id, order: order, courseId: video._id}})
            },
            lastWatchMark(percentage){
                return `background: linear-gradient(90deg, rgb(255, 14, 9) ${percentage}%, rgb(214, 214, 214) 0%)`;
            },
            courseFilter(active){
                this.filterByQueryString('');
                this.myCourseList(active)
                this.active = active
            }
        },

        created(){
            window.addEventListener('resize', this.handleResize);
            this.handleResize();

            this.myCourseList(1)
        },
        watch: {
            query: function () {
                this.myCourseList(this.active)
            },

            gradeID: function () {
                this.myCourseList(this.active)
            }
        }
    }
</script>

<style scoped>
    svg {
        width: 40px;
    }
</style>
