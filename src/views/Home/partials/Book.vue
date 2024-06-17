<template>
    <div class="my-10">
        <div class="flex items-center justify-between mb-5">
            <div class="font-black text-lg">សៀវភៅ</div>
            <div class="text-sm text-custom cursor-pointer">មើលទាំងអស់</div>
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
                    <div class="cursor-pointer">
                        <img :src="course.thumbnail" alt="">
                        <div class="text-sm mt-2"> {{ cutString(course.title, 50) }} </div>
                        <div class="text-sm mt-2 text-gray-400">រៀបរៀងដោយ៖ {{ course.teacher.name }}</div>
                    </div>
                </section>
            </vue-horizontal>
        </div>
    </div>
</template>
<script>
import VueHorizontal from "vue-horizontal";
import Loading from '../../../components/Loading.vue';
import { mapState, mapActions } from "vuex";
import helper from "./../../../helper/helper";

export default {
    components: { VueHorizontal, Loading },

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
        }
    },
    computed: {
        ...mapState("course", [
            "loadingEbookCourse",
            "ebookCourses",
        ]),
    },
    methods: {
        ...mapActions("course", [
            "getCourseEbook",
            "getFilter",
        ]),

        cutString(string, limit) {
            return helper.cutString(string, limit);
        },
    },

    mounted() {
        this.getCourseEbook(this.payload);
    }
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