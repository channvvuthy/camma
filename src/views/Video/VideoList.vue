<template>
  <div class="home p-5 text-left">
    <div
      v-if="loadingVideo"
      class="flex justify-center items-center h-screen relative -top-5"
    >
      <h1 class="text-sm font-semibold font-khmer_os relative -top-20">
        <loading></loading>
      </h1>
    </div>
    <div
      class="overflow-y-scroll pt-3 -mt-3"
      style="max-height: 100vh"
      @scroll="onScroll"
      id="videoList"
      v-else
    >
      <div
        class="h-100 flex justify-center items-center"
        v-if="courses.lesson <= 0"
      >
      <div class="text-custom text-base font-khmer_os">មិនមានទិន្ន័យ</div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <template v-for="(video, key) in courses.lesson">
          <div
            class="flex-col bg-white pb-5 shadow"
            :key="key"
            v-if="video.type == 1"
          >
            <div class="relative">
              <div
                class="
                  absolute
                  right-0
                  top-0
                  w-6
                  mt-2
                  mr-2
                  bg-gray-50
                  cursor-pointer
                  bg-opacity-75
                "
                style="border-radius: 2px; z-index: 50"
              >
                <img
                  src="/icon/MenuSidebar/FavouriteFull.png"
                  class="max-w-full"
                  @click="removeFav(video.video._id)"
                  v-if="video.video.is_favorite || isActiveFav(video.video._id)"
                />

                <img
                  src="/icon/MenuSidebar/Favorite.png"
                  class="max-w-full"
                  @click="addFav(video.video._id)"
                  v-else
                />
              </div>
              <div
                @click="courseDetail(video.video)"
                class="cursor-pointer"
                :title="video.video.title"
              >
                <div :id="video.video._id" class="relative">
                  <img :src="video.video.thumbnail" alt="" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value="100"
                    step="1"
                    class="
                      w-full
                      percentage
                      cursor-default
                      absolute
                      bottom-0
                      left-0
                    "
                    v-if="video.video && video.video.last_watch"
                    :style="lastWatchMark(video.video.last_watch.percentage)"
                  />
                </div>
                <div class="flex justify-start items-start relative px-4">
                  <div class="w-12 h-12 mr-2">
                    <div
                      class="
                        w-12
                        h-12
                        border border-gray-50
                        rounded-full
                        mt-4
                        bg-center
                      "
                      :style="{
                        backgroundImage: `url(${video.video.teacher.photo})`,
                        backgroundSize: 'cover',
                      }"
                    ></div>
                  </div>
                  <div class="flex-cols w-full">
                    <div
                      class="
                        font-khmer_os
                        text-14px
                        mt-4
                        font-semibold
                        text-gray-700
                      "
                      v-html="
                        cutString(
                          video.video.title,
                          window.width <= 1366 ? 20 : 45
                        )
                      "
                    ></div>
                    <div class="flex justify-between">
                      <h2 class="text-nav text-xs font-khmer_os mt-2 w-full">
                        {{ video.video.teacher.name }}
                      </h2>
                      <div class="flex justify-end">
                        <div
                          class="
                            text-14px text-nav
                            flex
                            items-end
                            whitespace-nowrap
                          "
                        >
                          <span class="pl-1"
                            >{{ kFormatter(video.video.view) }} Views</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="video.type == 3" @click="showAds(video)" :key="key">
            <div class="relative cursor-pointer">
              <img :src="video.ads.banner.thumbnail" alt="" />
              <div
                class="
                  ads
                  absolute
                  text-custom
                  w-10
                  h-6
                  text-13px
                  top-0
                  right-0
                  bg-white
                  flex
                  justify-center
                  items-center
                  bg-opacity-60
                "
              >
                <span>Ads</span>
              </div>
            </div>
            <div class="flex justify-start items-start relative cursor-pointer">
              <div
                class="
                  w-10
                  h-10
                  border border-gray-50
                  rounded-full
                  mt-4
                  mr-2
                  bg-center
                "
                :style="{
                  backgroundImage: `url(${video.ads.logo})`,
                  backgroundSize: 'cover',
                }"
              ></div>
              <div class="flex-cols">
                <div
                  class="
                    font-khmer_os
                    text-14px
                    mt-4
                    font-semibold
                    text-gray-700
                  "
                  v-html="
                    cutString(video.ads.company, window.width <= 1366 ? 20 : 45)
                  "
                ></div>
                <h2 class="text-gray-400 text-14px font-khmer_os mt-1">
                  {{ video.ads.title }}
                </h2>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <VideoADS
      v-if="showVideoAds"
      :videoUrl="videoUrl"
      @closeAds="closeAds"
      :poster="videoPoster"
    ></VideoADS>
  </div>
</template>

<script>
import VideoADS from "./ads/VideoADS.vue";
import { mapState, mapActions } from "vuex";
import helper from "./../../helper/helper";
import Loading from "./../../components/Loading";
const { ipcRenderer } = require("electron");

export default {
  name: "VideoList",
  components: {
    Loading,
    VideoADS,
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
      this.$store.commit("course/getTeacherInfo", video.teacher);
      ipcRenderer.send("youtubeVideo", video.video_youtube);
      this.$router.push({
        name: "course-detail",
        params: {
          videoId: video._id,
          order: video.order,
          courseId: video.course._id,
        },
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
