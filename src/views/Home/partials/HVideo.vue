<template>
    <div class="mb-5">
        <div class="flex items-center justify-between mb-5">
            <div class="font-black text-lg">វីដេអូ</div>
            <div @click="$router.push({ name: 'video' })" class="text-sm text-custom cursor-pointer"
                v-if="courses && courses.lesson && courses.lesson.length">
                មើលទាំងអស់</div>
        </div>
        <div :style="{ maxWidth: `${windowWidth - 300}px` }">
            <vue-horizontal responsive v-if="loadingVideo">
                <section v-for="item in items" :key="item.title"
                    class="bg-gray-200 h-52 rounded-lg flex items-center justify-center">
                    <Loading />
                </section>
            </vue-horizontal>
            <vue-horizontal responsive v-else>
                <section v-for="(course, index) in courses.lesson" :key="index" style="width:auto !important;"
                    class="flex p-3 bg-white rounded-2xl shadow-lg border overflow-hidden">
                    <div @click="viewCourseDetail(course.video)"
                        class="group-hover rounded-lg bg-center bg-cover cursor-pointer relative"
                        style="width:300px !important; height:170px;"
                        :style="{ backgroundImage: `url(${course.video.thumbnail})` }">
                    </div>
                    <div class="flex flex-col justify-between pl-4" style="height:170px;">
                        <div class="text-wrap text-sm" style="max-width:300px;">
                            {{ cutString(course.video.title, 150) }}
                        </div>
                        <div class="text-gray-400 text-sm flex justify-between">
                            <div>
                                <div>{{ course.video.teacher.name }}</div>
                                <div class="h-1"></div>
                                <div>{{ course.video.view }} Views</div>
                            </div>
                            <div class="mt-3 pr-5 cursor-pointer">
                                <div v-if="!course.video.is_favorite" @click="addFavorite(course)">
                                    <FavoriteIcon fill="transparent" stroke="#d1d5db" />
                                </div>
                                <div v-else @click="removeActiveFavorite(course)">
                                    <FavoriteIcon fill="#ef4444" stroke="#ef4444" />
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </vue-horizontal>
        </div>
        <div v-if="courses && courses.lesson && courses.lesson.length <= 0">
            <p class="text-sm text-gray-500">មិនវីដេអូត្រូវបង្ហាញទៅតាមអ្វីដែលអ្នកកំពុងស្វែងរកនោះទេ!</p>
        </div>
        <LoadingOverlay v-if="isDetail" @dismiss="dismiss()" />
    </div>
</template>
<script>
import VueHorizontal from "vue-horizontal";
import Loading from '../../../components/Loading.vue';
import { mapState, mapActions } from "vuex";
import helper from "./../../../helper/helper";
import LoadingOverlay from "./../../Modal/LoadingOverlay.vue";
import FavoriteIcon from '../../MyCourse/components/FavoriteIcon.vue';


export default {
    components: { VueHorizontal, Loading, LoadingOverlay, FavoriteIcon },
    data() {
        return {
            windowWidth: window.innerWidth,
            items: [...Array(5).keys()].map((i) => {
                return { title: `Item ${i}`, content: `🚀 Content ${i}` };
            }),
            isDetail: false,
        }
    },

    computed: {
        ...mapState("course", ["courses", "loadingVideo"]),
    },

    methods: {
        ...mapActions("course", [
            "videoList",
            "videoPagination",
        ]),
        async removeActiveFavorite({ _id }) {
            await this.$store.dispatch("favorite/removeFavorite", _id);
            this.$store.commit("course/removeActiveFavorite", _id);

        },
        async addFavorite({ _id }) {
            await this.$store.dispatch("favorite/add", _id);
            this.$store.commit("course/addFavorite", _id);
        },
        cutString(text, limit) {
            if (!text) {
                return;
            }
            return helper.cutString(text, limit);
        },

        viewCourseDetail(video) {
            this.isDetail = true;
            this.$store.dispatch("course/getvideoPlay", video.course._id)
                .then(({ data }) => {
                    this.$store.commit("course/gettingCourseDetail", data);
                    const [vd] = data.list.filter(item => item.order === video.order);
                    this.$store.commit("course/getVideo", vd);

                    this.isDetail = false;
                    this.$router.push({
                        name: "course-detail",
                        params: {
                            videoId: video._id,
                            order: video.order,
                            courseId: video.course._id,
                        },
                    });
                })
                .catch(({ response }) => {
                    helper.error(response.data);
                    this.isDetail = false;
                });
        },

    },

    mounted() {
        this.videoList();
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