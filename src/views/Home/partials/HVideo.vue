<template>
    <div class="mb-5">
        <div class="flex items-center justify-between mb-5">
            <div class="font-black text-lg">វីដេអូ</div>
            <div class="text-sm text-custom cursor-pointer">មើលទាំងអស់</div>
        </div>
        <div :style="{ maxWidth: `${windowWidth - 300}px` }">
            <vue-horizontal responsive v-if="loadingVideo">
                <section v-for="item in items" :key="item.title"
                    class="bg-gray-200 h-52 rounded-lg flex items-center justify-center">
                    <Loading />
                </section>
            </vue-horizontal>
            <vue-horizontal responsive v-else>
                <section v-for="(course, index) in courses.lesson" :key="index" style="width:auto !important;">
                    <div class="rounded-lg bg-center bg-cover shadow cursor-pointer"
                        style="width:300px !important; height:170px;"
                        :style="{ backgroundImage: `url(${course.video.thumbnail})` }"></div>
                </section>
            </vue-horizontal>

        </div>
    </div>
</template>
<script>
import VueHorizontal from "vue-horizontal";
import Loading from '../../../components/Loading.vue';
import { mapState, mapActions } from "vuex";

export default {
    components: { VueHorizontal, Loading },
    data() {
        return {
            windowWidth: window.innerWidth,
            items: [...Array(5).keys()].map((i) => {
                return { title: `Item ${i}`, content: `🚀 Content ${i}` };
            }),
        }
    },

    computed: {
        ...mapState("course", ["courses", "loadingVideo"]),
    },

    methods: {
        ...mapActions("course", [
            "videoList",
            "videoPagination",
            "removeActiveFavorite",
        ]),
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