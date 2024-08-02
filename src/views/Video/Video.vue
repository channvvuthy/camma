<template>
  <div class="home p-5 bg-gray-50 text-left">
    <div v-if="loadingVideoCourse" class="flex justify-center items-center h-screen relative -top-5">
      <h1 class="text-sm font-semibold font-khmer_os relative -top-20">
        <loading></loading>
      </h1>
    </div>
    <div class="overflow-y-scroll pt-3 -mt-3 pb-56" style="max-height: 100vh" @scroll="onScroll" id="videoList" v-else>
      <div class="h-screen flex justify-center items-center" v-if="videoCourses.length <= 0">
        <img src="/icon/Empty/Empty.svg" class="w-64 mb-5 relative -top-28" />
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="flex-col relative cursor-pointer pb-4" v-for="(video, key) in videoCourses" :key="key">
          <div>
            <div v-if="video.is_new" class="absolute right-0 top-0 z-50" style="margin-top: -8px; margin-right: -8px">
              <img src="/icon/New/New.png" class="w-10" />
            </div>
            <div :id="video._id" class="clear-both">
              <div @click="goToPlayList(video)" class="relative">
                <img :src="video.thumbnail" class="w-full rounded-2xl" />
                <input type="range" min="0" max="100" value="100" step="1"
                  class=" w-full percentage cursor-default absolute bottom-0 left-0" v-if="video.last_watch"
                  :style="lastWatchMark(video.last_watch.percentage)" />
              </div>
              <div class="
                  mt-10
                  flex
                  justify-start
                  items-center
                  font-khmer_os
                  left-0
                  w-full
                  bg-opacity-60
                ">
                <div class="flex items-center" @click="goToPlayList(video)">
                  <div>
                    <div class="h-12 w-12 rounded-full ml-3 bg-center bg-cover"
                      :style="{ backgroundImage: `url(${video.teacher.photo})`, }"></div>
                  </div>
                  <div class="text-sm ml-3">
                    <div>{{ cutString(video.title, 40) }}</div>
                    <div class="text-nav mt-1">{{ video.teacher.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoadingOverlay v-if="loadingDetail" @dismiss="dismiss()" />
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import { mapActions, mapState } from "vuex";
import helper from "./../../helper/helper";
import Loading from "./../../components/Loading";
import moment from "moment";
import LoadingOverlay from "./../Modal/LoadingOverlay.vue";
export default {
  name: "Video",
  components: {
    Loading,
    LoadingOverlay,
  },
  data() {
    return {
      loadingDetail: false,
      window: {
        width: 0,
        height: 0,
      },
      page: 1,
      noResult: false,
    };
  },
  computed: {
    ...mapState("course", ["videoCourses", "loadingVideoCourse", "teacher"]),
    query() {
      return this.$store.state.course.s;
    },
    removedCart() {
      return this.$store.state.cart.removedCart;
    },
    gradeID() {
      return this.$store.state.course.gradeID;
    },
    selectedSubjectId() {
      return this.$store.state.course.selectedSubjectId;
    },
  },

  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    ...mapActions("course", [
      "getVideoCourse",
      "videoCoursePagination",
      "afterAddToCart",
    ]),
    ...mapActions("cart", ["addCart", "getCart"]),

    addCartToCart(course_id) {
      this.addCart(course_id).then(() => {
        this.afterAddToCart(course_id);
        this.getCart();
      });
    },
    lastWatchMark(percentage) {
      return `background: linear-gradient(90deg, rgb(255, 14, 9) ${percentage}%, rgb(214, 214, 214) 0%)`;
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.page++;
        if (!this.noResult) {
          this.videoCoursePagination(this.page).then((response) => {
            if (response.length <= 0) {
              this.noResult = true;
            }
          });
        }
      }
    },
    formatDate(date) {
      moment.locale("km");
      return moment(date).format("ll");
    },
    cutString(text, limit) {
      return helper.cutString(text, limit);
    },
    async goToPlayList(video) {
      const order = video.last_watch ? video.last_watch.order : 1;
      this.loadingDetail = true;

      try {
        const res = await this.$store.dispatch("course/getvideoPlay", video._id);
        this.loadingDetail = false;

        this.$store.commit("course/gettingCourseDetail", res.data);
        let vd = res.data.list.find((item) => item.order === order);

        if (vd === undefined) {
          vd = res.data.list[0];
        }

        if (vd) {
          this.$store.commit("course/getVideo", vd);
          this.$router.push({
            name: "course-detail",
            params: {
              videoId: vd._id,
              order: order,
              courseId: res.data.course._id,
            },
          });
        } else {
          console.error('Video not found in the list.');
        }
      } catch (err) {
        console.error(err);
        this.loadingDetail = false;
      }
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    this.getVideoCourse();
    ipcRenderer.on("resetGrade", () => {
      this.page = 1;
    });

    this.$store.commit("course/setSubjectFilterTitle", "ជ្រើសរើសកម្មវិធីសិក្សា");
  },
  watch: {
    query: function () {
      this.getVideoCourse();
    },
    gradeID: function () {
      this.getVideoCourse();
    },
    selectedSubjectId: function () {
      this.getVideoCourse();
    },
    removedCart: function (course_id) {
      this.afterAddToCart(course_id);
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
</style>