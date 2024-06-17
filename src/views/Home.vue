<template>
    <div class="home p-5">
        <div v-if="loadingVideo" class="flex justify-center items-center h-screen relative -top-5">
            <h1 class="text-sm font-semibold font-khmer_os relative -top-20">
                <loading></loading>
            </h1>
        </div>
        <div class="h-screen overflow-y-scroll pb-40">
            <h-video />
            <book />
        </div>
        <VideoADS v-if="showVideoAds" :videoUrl="videoUrl" @closeAds="closeAds" :poster="videoPoster" />
        <LoadingOverlay v-if="loadingDetail" @dismiss="dismiss()" />
    </div>
</template>

<script>
import VideoADS from "./Video/ads/VideoADS.vue";
import { mapState, mapActions } from "vuex";
import helper from "./../helper/helper";
const { ipcRenderer } = require("electron");
import LoadingOverlay from "./Modal/LoadingOverlay.vue";
import Loading from "../components/Loading.vue";
import HVideo from "./Home/partials/HVideo.vue";
import Book from "./Home/partials/Book.vue";


export default {
    name: "VideoList",
    components: {
        VideoADS,
        LoadingOverlay,
        Loading,
        HVideo,
        Book
    },
    data() {
        return {
            window: {
                width: 0,
                height: 0,
            },
            activeId: [],
            removeId: [],
            page: 1,
            showVideoAds: false,
            loadingAds: false,
            videoUrl: "",
            videoPoster: "",
            noResult: false,
            loadingDetail: false,
        };
    },

    computed: {
        ...mapState("course", ["courses", "loadingVideo"]),
        ...mapState("favorite", ["favorites", "loading"]),
        query: {
            get() {
                return this.$store.state.course.s;
            },
            set(newQuery) {
                return newQuery;
            },
        },
    },
    destroyed() {
        window.removeEventListener("resize", this.handleResize);
    },
    methods: {
        ...mapActions("course", [
            "videoList",
            "videoPagination",
            "removeActiveFavorite",
        ]),
        ...mapActions("favorite", ["add", "removeFavorite", "getFavorite"]),
        dismiss() {
            this.loading = false;
        },
        handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;
        },

        cutString(text, limit) {
            return helper.cutString(text, limit);
        },
        closeAds() {
            this.loadingAds = false;
            this.showVideoAds = false;
        },
        showAds(ads) {
            if (ads.ads.banner.type == 2) {
                ipcRenderer.send("openLink", ads.ads.link);
            }

            if (ads.ads.banner.type == 1) {
                this.videoPoster = ads.ads.banner.thumbnail;
                this.loadingAds = true;
                this.showVideoAds = true;
                ipcRenderer.send("youtubeVideo", ads.ads.banner.url);
            }
        },
        onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
            if (scrollTop + clientHeight >= scrollHeight) {
                this.page++;
                if (!this.noResult) {
                    this.videoPagination(this.page).then((response) => {
                        if (response.length <= 0) {
                            this.noResult = true;
                        }
                    });
                }
            }
        },
        removeFav(lesson_id) {
            try {
                for (var i = 0; i < this.activeId.length; i++) {
                    if (this.activeId[i] == lesson_id) {
                        this.activeId.splice(i, 1);
                    }
                }
                this.removeFavorite(lesson_id).then(() => {
                    this.removeActiveFavorite(lesson_id);
                });
            } catch (err) {
                return err;
            }
        },

        addFav(lesson_id) {
            this.activeId.push(lesson_id);
            this.add(lesson_id);
        },
        lastWatchMark(percentage) {
            return `background: linear-gradient(90deg, rgb(255, 14, 9) ${percentage}%, rgb(214, 214, 214) 0%)`;
        },
        isActiveFav(lesson_id) {
            try {
                for (let i = 0; i < this.activeId.length; i++) {
                    if (this.activeId[i] == lesson_id) {
                        return true;
                    }
                }
            } catch (err) {
                console.log(err);
            }
            return false;
        },

        kFormatter(num) {
            return helper.kFormatter(num);
        },

        courseDetail(video) {
            this.loadingDetail = true;
            this.$store
                .dispatch("course/getvideoPlay", video.course._id)
                .then((res) => {
                    this.$store.commit("course/gettingCourseDetail", res.data);
                    var vd = res.data.list.filter((item) => item.order == video.order);

                    this.$store.commit("course/getVideo", vd[0]);

                    this.loadingDetail = false;
                    this.$router.push({
                        name: "course-detail",
                        params: {
                            videoId: video._id,
                            order: video.order,
                            courseId: video.course._id,
                        },
                    });

                })
                .catch((err) => {
                    helper.error(err.response.data);
                    this.loadingDetail = false;
                });
        },
    },
    created() {
        ipcRenderer.on("youtubeVideo", (event, arg) => {
            if (arg.length > 1) {
                this.videoUrl = arg
                    .filter((items) => items.itag == 22)
                    .map((item) => item.url)[0];
            } else {
                this.videoUrl = arg.map((item) => item.url)[0];
            }
        });
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
        this.videoList();
    },

    watch: {
        query: function () {
            this.videoList();
        },
    },
};
</script>

<style>
#videoList::-webkit-scrollbar {
    width: 5px !important;
}

#videoList::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3) !important;
}

#videoList::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.5) !important;
}

button.swal2-confirm.swal2-styled {
    font-family: "khmer os";
    outline: none;
    box-shadow: none;
}

h2#swal2-title {
    font-family: "khmer os";
    font-size: 16px;
}

.swal2-popup {
    width: 20rem !important;
    padding: 20px 0px 0px 0px !important;
}

.swal2-actions {
    border-top: 1px solid #e5e7eb !important;
    margin: 10px 0px 0px 0px !important;
}

.swal2-styled.swal2-confirm,
.swal2-styled.swal2-confirm:hover {
    border: 0;
    border-radius: 0.25em;
    background: initial;
    background-color: transparent !important;
    background-image: none !important;
    font-size: 1.0625em;
    color: #2778c4 !important;
}
</style>