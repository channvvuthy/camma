<template>
    <div class="my-10">
        <div class="flex items-center justify-between mb-5">
            <div class="font-black text-lg">សៀវភៅ</div>
            <div @click="$router.push({ name: 'book' })" class="text-sm text-custom cursor-pointer"
                v-if="ebookCourses && ebookCourses.length">មើលទាំងអស់</div>
        </div>
        <div :style="{ maxWidth: `${windowWidth - 300}px` }">
            <vue-horizontal responsive v-if="loadingEbookCourse">
                <section v-for="item in items" :key="item.title"
                    class="bg-gray-200 h-52 rounded-lg flex items-center justify-center w-96">
                    <Loading />
                </section>
            </vue-horizontal>
            <vue-horizontal responsive v-else>
                <section v-for="(course, index) in ebookCourses" :key="index">
                    <div class="cursor-pointer" @click="openBook(course)">
                        <img :src="course.thumbnail" alt="">
                        <div class="text-sm mt-2"> {{ cutString(course.title, 50) }} </div>
                        <div class="text-sm mt-2 text-gray-400">រៀបរៀងដោយ៖ {{ course.teacher.name }}</div>
                    </div>
                </section>
            </vue-horizontal>
        </div>

        <div v-if="ebookCourses && ebookCourses.length <= 0">
            <p class="text-sm text-gray-500">មិនមានសៀវភៅត្រូវបង្ហាញទៅតាមអ្វីដែលអ្នកកំពុងស្វែងរកនោះទេ!</p>
        </div>

        <ViewBook v-if="isBook" :view="bookCover" @closeView="isBook = false" @read="read($event)" />
        <ReadingBook v-if="isBookOpen" :books="bookDetail" @closeReading="isBookOpen = false" />
    </div>
</template>
<script>
import VueHorizontal from "vue-horizontal";
import Loading from '../../../components/Loading.vue';
import { mapState, mapActions } from "vuex";
import helper from "./../../../helper/helper";
import ViewBook from "../../Book/components/View.vue";
import ReadingBook from "../../Book/components/Read.vue";

export default {
    components: { VueHorizontal, Loading, ViewBook, ReadingBook },

    data() {
        return {
            windowWidth: window.innerWidth,
            items: [...Array(5).keys()].map((i) => {
                return { title: `Item ${i}`, content: `🚀 Content ${i}` };
            }),
            payload: {
                subject_id: "",
                grade_id: "",
                p: 1,
                s: "",
            },
            isBook: false,
            isBookOpen: false,
            bookCover: "",
            bookDetail: ""
        }
    },
    computed: {
        ...mapState("course", [
            "loadingEbookCourse",
            "ebookCourses",
        ]),
        query: {
            get() {
                return this.$store.state.course.s;
            },
            set(newQuery) {
                return newQuery;
            },
        },
        gradeID: {
            get() {
                return this.$store.state.course.gradeID;
            },
            set(gradeID) {
                return gradeID;
            },
        },
    },
    methods: {
        ...mapActions("course", [
            "getCourseEbook",
            "getFilter",
            "setLessonTitle",
            "readBook"
        ]),

        cutString(string, limit) {
            return helper.cutString(string, limit);
        },

        openBook(book) {
            this.isBook = true;
            this.bookCover = book;
        },
        read($event) {
            this.title = $event.title;
            this.setLessonTitle(this.title);
            this.loading = true;
            this.readBook({ course_id: $event.id, order: "" }).then((response) => {
                this.bookDetail = response;

                this.loading = false;
                this.isBook = false;
                this.isBookOpen = true;
            });
        },
    },

    mounted() {
        this.getCourseEbook(this.payload);
    },
    watch: {
        query: function (newQuery) {
            this.getCourseEbook({ ...this.payload, s: newQuery });
        },
        gradeID: function (newGrade) {
            this.getCourseEbook({ ...this.payload, grade_id: newGrade, s: this.query });
        },
    },
}
</script>


<style>
.v-hl-btn.v-hl-btn-prev.v-hl-btn-between {
    margin-left: 20px !important;
}

.v-hl-btn.v-hl-btn-next.v-hl-btn-between {
    margin-right: 20px !important;
}
</style>