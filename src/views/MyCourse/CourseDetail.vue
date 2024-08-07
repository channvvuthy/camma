<template>
  <div class="px-5 py-5">
    <div v-if="loadingCourseDetail" class="flex justify-center items-center h-screen relative -top-2">
      <h1 class="text-sm font-semibold font-khmer_os relative -top-20">
        <loading></loading>
      </h1>
    </div>
    <div v-else>
      <div class="flex items-center mb-3 cursor-pointer" @click="$router.go(-1)">
        <div class="mr-3">
          <BackIcon :size="20" />
        </div>
        <div class="font-black text-lg w-5/12">
          វីដេអូ
        </div>
      </div>
      <div class="flex">
        <div class="w-3/5 pr-5 overflow-y-scroll h-screen pb-40">
          <div>
            <MediaPlayer @onPlayerEnded="onPlayerEnded" @previousVideo="previousVideo"
              @lastWatchVideo="lastWatchVideo($event)" :last_watch="last_watch"
              @updateLastWatch="updateLastWatch($event)" @gettingResource="gettingResource($event)"></MediaPlayer>
          </div>
          <div class="flex justify-between">
            <div class="mt-4 font-khmer_os flex-1">
              <p class="text-14px font-semibold" v-if="!loadingPlay">
                <span :title="videoTitle ? videoTitle : videoPlay.title">
                  {{ videoTitle ? videoTitle : videoPlay.title }}
                </span>
              </p>
              <h2 class="text-gray-400 text-14px font-khmer_os mt-2 mb-5">
                {{ courseDetail.course.teacher.name }}
              </h2>
            </div>
            <div class="mt-4 flex text-gray-400 text-sm">
              <ViewIcon />
              <div class="ml-2">{{ numberOfView }} Views</div>
            </div>
          </div>
          <!-- Tool -->
          <div class="flex mb-5 justify-between items-center">
            <div class="text-xl">មតិយោបល់</div>
            <VideoOption :lesson_id="lesson_id" />

          </div>
          <Comment :lesson_id="lesson_id" v-if="lesson_id" />
        </div>
        <div class="w-2/5 bg-white h-screen border border-gray-200 pb-5 rounded-2xl" id="courseList" ref="courseDetail">
          <div class="overflow-y-scroll pt-5" @scroll="onScroll" ref="feed" id="feed" style="max-height: 91vh">
            <div class="flex px-5 mb-3 justify-between items-center">
              <div class="font-black">បញ្ជីវីដេអូ</div>
              <div v-if="courseDetail && courseDetail.list && courseDetail.list.length" class="text-gray-300 text-sm">
                {{ order }}/{{ courseDetail.list.length }}
              </div>
            </div>
            <div class="flex-col relative" :class="order == course.order ? 'my-2' : 'mb-1'"
              v-for="(course, key) in courseDetail.list" :key="key">
              <div id="vdActive" class="absolute left-0 h-full flex justify-center items-center pl-3"
                v-if="order == course.order">
                <IconPlayActive />
              </div>
              <div class="flex justify-center items-center cursor-pointer pl-5" :class="order == course.order
                ? 'bg-gray-300 py-2'
                : courseDetail.is_buy == 0 && course.free_watch == 0
                  ? 'opacity-50'
                  : ' py-1'
                ">
                <div class="relative">
                  <img :src="getPathFromUrl(course.thumbnail)" alt="" class="w-40 ml-2 rounded-lg"
                    :id="course.video_youtube" @click="nextOrder(course.order)" />
                  <input type="range" min="0" max="100" value="100" step="1"
                    class="w-40 ml-2 percentage cursor-default absolute bottom-0 left-0" v-if="course.last_watch"
                    :id="course._id" :style="lastWatchMark(course.last_watch.percentage)" />
                </div>
                <div class="flex-1 font-khmer_os text-sm pl-3" :title="course.title">
                  <div class="flex-cols">
                    <p v-html="key + 1 + '. ' + cutString(course.title, window.width <= 1366 ? 25 : 55)"
                      @click="nextOrder(course.order)"></p>
                    <div class="flex justify-between items-center">
                      <div class="mt-3 text-14px text-gray-500 flex" @click="nextOrder(course.order)">
                        <div class="opacity-60 flex iems-center">
                          <ViewIcon />
                        </div>
                        <span class="pl-1">{{ kFormatter(course.view) }}</span>
                        <span class="pl-1 text-sm">Views</span>
                      </div>
                      <div class="mt-3 pr-5 cursor-pointer" @click="toggleFavorite(course)">
                        <FavoriteIcon fill="transparent" stroke="#a3a3a3" v-if="!course.is_favorite" />
                        <FavoriteIcon fill="#ef4444" stroke="#ef4444" v-else />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="h-20">&nbsp;</div>
          </div>
        </div>
      </div>
    </div>
    <Message v-if="showMessage" @closeMessage="closeMessage" @showCart="showCart" />

    <MessageConfirm v-if="showConfim" @closeConfirm="closeConfirm" @confirmDelete="confirmDelete" />

    <PaymentMethod v-if="showPaymentForm" @closePaymentMethod="closePaymentMethod" />

    <Cart v-if="showCartForm" @closeCart="closeCart" />

    <QuestionAnswer v-if="showQAndA" :title="videoTitle ? videoTitle : videoPlay.title"
      @closeQuestionAndAnswer="closeQuestionAndAnswer" :lesson_id="lesson_id" />

    <Document v-if="showDocument" :lessonTitle="lessonTitle" @closeReading="closeReading" :documents="documents"
      @setLessonTile="setLessonTile($event)" />

    <DownloadQuality v-if="showQualityForm" @closeQuality="closeQuality" @downloadQuality="downloadQuality($event)" />
  </div>
</template>

<script>
// Vue component
import ViewIcon from "./../../components/ViewIcon.vue";
import helper from "./../../helper/helper";
import { mapActions, mapState } from "vuex";
import IconPlayActive from "./../../components/IconPlayActive";
import Message from "./components/Message.vue";
import Comment from "./components/Comment.vue";
import MessageConfirm from "./components/MessageConfirm.vue";
import PaymentMethod from "./components/PaymentMethod";
import Cart from "./components/Cart";
import MediaPlayer from "./components/media/Player";
import Loading from "./../../components/Loading";
import BackIcon from "./../../components/BackIcon";
import QuestionAnswer from "./components/QuestionAnswer";
import Document from "./components/Document";
import DownloadQuality from "./components/DownloadQuality";
import FavoriteIcon from './components/FavoriteIcon.vue';
import VideoOption from "./components/VideoOption.vue";
const { ipcRenderer } = require("electron");

export default {
  components: {
    VideoOption,
    FavoriteIcon,
    MediaPlayer,
    Loading,
    ViewIcon,
    IconPlayActive,
    Message,
    PaymentMethod,
    Cart,
    QuestionAnswer,
    Document,
    DownloadQuality,
    MessageConfirm,
    BackIcon,
    Comment
  },
  data() {
    return {
      last_watch: "",
      lastOrder: "",
      window: {
        width: 0,
        height: 0,
      },
      videoPlay: {},
      videoTitle: null,
      loadingPlay: false,
      order: null,
      is_buy: false,
      showMessage: false,
      showConfim: false,
      showPaymentForm: false,
      showCartForm: false,
      showQAndA: false,
      resources: [],
      lesson_id: null,
      showDocument: false,
      lessonTitle: "",
      documents: [],
      download: null,
      showQualityForm: false,
      downloadingVideo: [],
      downloaded: [],
      removeVideo: "",
    };
  },

  computed: {
    ...mapState("course", ["courseDetail", "loadingCourseDetail", "teacher", "numberOfView"]),
    ...mapState("playVideo", ["video"]),
    ...mapState("cart", ["cart", "loadingCart"]),

  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    ...mapActions('favorite', ["add", "removeFavorite"]),
    ...mapActions("course", [
      "getCourseDetail",
      "lessonView",
      "getCourseByScroll",
      "removeActiveFavorite",
    ]),
    ...mapActions("playVideo", [
      "getVideoLink",
      "gettingNextVideo",
      "stopWatch",
    ]),
    ...mapActions("cart", ["addCart"]),

    async toggleFavorite({ _id, is_favorite }) {
      (is_favorite == undefined || is_favorite == 0) ? await this.add(_id) : await this.removeFavorite(_id);
      this.$store.commit("course/toggleMyFavorite", { _id, is_favorite })
    },

    gettingResource($event) {
      this.resources = $event;
    },
    closeQuality() {
      this.showQualityForm = false;
    },

    isDownloaded(video) {
      if (this.downloaded.length) {
        for (let i = 0; i < this.downloaded.length; i++) {
          if (video._id === this.downloaded[i]._id) {
            return true;
          }
        }
      }
      return false;
    },

    isDownloading(video) {
      if (this.downloadingVideo.length) {
        for (let i = 0; i < this.downloadingVideo.length; i++) {
          if (this.downloadingVideo[i] === video._id) {
            return true;
          }
        }
      }
      return false;
    },

    confirmRemoveDownload(video) {
      this.removeVideo = video;
      this.showConfim = true;
    },
    closeConfirm() {
      this.showConfim = false;
    },
    confirmDelete() {
      this.downloaded = this.downloaded.filter(
        (item) => item._id !== this.removeVideo._id
      );
      localStorage.setItem("downloaded", JSON.stringify(this.downloaded));
      this.showConfim = false;
      ipcRenderer.send("removeDownload", this.removeVideo._id);
    },

    getDownloading() {
      this.downloadingVideo = localStorage.getItem("downloadingStorage")
        ? JSON.parse(localStorage.getItem("downloadingStorage"))
        : [];
    },
    downloadQuality($event) {
      this.download.quality = $event;
      this.showQualityForm = false;
      ipcRenderer.send("download", this.download);
      this.downloadingVideo.push(this.download._id);
      let downloadingStorage = [];

      if (localStorage.getItem("downloadingStorage")) {
        downloadingStorage = JSON.parse(
          localStorage.getItem("downloadingStorage")
        );
      }
      downloadingStorage.push(this.download._id);
      localStorage.setItem(
        "downloadingStorage",
        JSON.stringify(downloadingStorage)
      );

      this.getDownloading();
    },
    downloadVideo(video) {
      this.showQualityForm = true;
      video.course = this.courseDetail.course;
      video.course.teacher = this.teacher;

      this.download = video;
    },

    updateLastWatch(event) {
      this.last_watch = event;
    },
    lastWatchVideo(event) {
      event.lesson_id = this.videoPlay._id;
      this.stopWatch(event).then(() => {
        let percentage = Math.round((event.mark * 100) / event.duration);
        let last_watch = {
          mark: event.mark,
          order: this.order,
          _id: this.videoPlay._id,
          percentage: percentage,
        };

        let downloaded = this.getItem("downloaded");

        if (downloaded) {
          downloaded = downloaded.filter((item) => {
            if (item._id === this.videoPlay._id) {
              item.last_watch = last_watch;
            }
            return item;
          });

          this.setItem("downloaded", downloaded);
        }

        this.courseDetail.list = this.courseDetail.list.filter((item) => {
          if (item._id === event.lesson_id) {
            item.last_watch = last_watch;
          }
          return item;
        });
      });
    },
    setLessonTile($event) {
      this.lessonTitle = $event;
    },
    showMyDocument() {
      this.lessonTitle = this.documents.map((item) => item.title)[0];
      this.showDocument = true;
    },
    closeReading() {
      this.showDocument = false;
    },
    QuestionAndAnswer() {
      this.lesson_id = this.videoPlay._id;
      this.showQAndA = true;
    },
    closeQuestionAndAnswer() {
      this.showQAndA = false;
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      this.lastOrder =
        this.courseDetail.list[this.courseDetail.list.length - 1].order;

      if (scrollTop + clientHeight >= scrollHeight) {
        this.getCourseByScroll({
          courseId: this.$route.params.courseId,
          order: this.lastOrder,
        });
      }
    },

    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    isDownloadedExist(video) {
      let downloaded = this.getItem("downloaded");
      if (downloaded) {
        if (typeof video === "object") {
          return downloaded.filter((item) => item._id === video._id);
        }
        return downloaded.filter((item) => item._id === video);
      }
      return false;
    },
    getItem(item) {
      if (!localStorage.getItem(item)) {
        return;
      }
      return JSON.parse(localStorage.getItem(item));
    },
    setItem(item, value) {
      localStorage.setItem(item, JSON.stringify(value));
    },

    nextOrder(order) {
      this.gettingNextVideo(false);

      this.videoPlay = this.courseDetail.list.filter(
        (item) => item.order == order
      )[0];

      this.$store.commit("course/getVideo", this.videoPlay);
      this.lesson_id = this.videoPlay._id

      this.addLastWatch(this.videoPlay);

      this.lessonView(this.videoPlay["_id"]).then((res) => {
        this.documents = res;
      });

      this.order = order;
    },
    previousVideo() {
      if (this.order <= 1) {
        return;
      }

      this.order = this.order - 1;

      let videoOrder = this.courseDetail.list.map((item) => item.order);
      let lastOrder = Math.max(...videoOrder);
      let firstOrder = Math.min(...videoOrder);
      let previousVideo = this.order;

      let videoId;

      if (this.isDownloadedExist(this.order).length) {
        this.videoPlay = this.isDownloadedExist(this.order)[0];
        videoId = this.videoPlay._id;
        this.order = previousVideo;
        this.gettingNextVideo(false);
        ipcRenderer.send("nextDownload", this.videoPlay);
      } else {
        let videoFilter = this.courseDetail.list.filter(
          (item) => item.order === previousVideo
        );
        this.videoPlay = videoFilter[0];
        let isFree = videoFilter.map((item) => item.free_watch)[0];
        videoId = videoFilter.map((item) => item._id)[0];
        if (isFree === 0 && this.courseDetail.is_buy === 0) {
          return;
        }

        let video_youtube = this.courseDetail.list
          .filter((item) => item.order === previousVideo)
          .map((ytId) => ytId.video_youtube);
        this.order = previousVideo;
        this.gettingNextVideo(false);
        ipcRenderer.send("nextVideo", video_youtube);
      }
      this.addLastWatch(this.videoPlay);

      if (previousVideo >= lastOrder) {
        previousVideo = firstOrder;
        this.order = firstOrder;
        this.$nextTick(() => {
          this.$refs.courseDetail.scrollTo(0, 0);
        });
      }

      this.lessonView(videoId).then((res) => {
        this.documents = res;
      });
    },
    onPlayerEnded() {
      if (this.courseDetail.list.length > 1) {
        let videoOrder = this.courseDetail.list.map((item) => item.order);
        let lastOrder = Math.max(...videoOrder);
        if (this.order == lastOrder) {
          this.$nextTick(() => {
            this.$refs.courseDetail.scrollTop = 0;
          });
          this.order = 1;
          return;
        }
        let nextVideo = this.order + 1;
        let videoFilter = this.courseDetail.list.filter(
          (item) => item.order === nextVideo
        );

        this.videoPlay = videoFilter[0];

        this.addLastWatch(this.videoPlay);
        this.order = nextVideo;
        this.gettingNextVideo(false);
        this.$store.commit("course/getVideo", this.videoPlay);
      }
    },
    cutString(text, limit) {
      if (!text) {
        return;
      }
      return helper.cutString(text, limit);
    },
    getPathFromUrl(url) {
      return url.split("?")[0];
    },
    kFormatter(num) {
      return helper.kFormatter(num);
    },

    closeMessage() {
      this.showMessage = false;
    },

    closePaymentMethod() {
      this.showCartForm = false;
    },
    showCart() {
      this.addCart(this.courseDetail.course._id);

      this.showMessage = false;
      this.showCartForm = true;
    },

    downloadSucceed(video = null) {
      let downloaded = [];
      if (localStorage.getItem("downloaded")) {
        downloaded = JSON.parse(localStorage.getItem("downloaded"));
      }

      if (video) {
        downloaded.push(video);
      }

      downloaded = downloaded.filter(
        (value, index, self) =>
          self.findIndex((m) => m._id === value._id) === index
      );

      localStorage.setItem("downloaded", JSON.stringify(downloaded));

      this.downloaded = downloaded;
    },

    closeCart() {
      this.showCartForm = false;
    },
    addLastWatch(videoPlay) {
      if (videoPlay.last_watch) {
        this.last_watch = videoPlay.last_watch.mark;
      } else {
        this.last_watch = 0;
      }
    },

    buy() {
      this.addCart(this.courseDetail.course._id).then(() => {
        this.showCartForm = true;
      });
    },
    lastWatchMark(percentage) {
      return `background: linear-gradient(90deg, rgb(255, 14, 9) ${percentage}%, rgb(214, 214, 214) 0%)`;
    },

    scrollToBottom() {
      setTimeout(() => {
        let vdActive = document.getElementById("vdActive");
        if (this.order > 5) {
          this.$refs.feed.scrollTop =
            vdActive.getBoundingClientRect().top - 120;
        }
      }, 3000);
    },
  },
  mounted() {
    if (this.courseDetail.list && this.courseDetail.list.lenght > 1) {
      this.lastOrder =
        this.courseDetail.list[this.courseDetail.list.length - 1].order;
    }
    this.scrollToBottom();

  },
  created() {
    window.addEventListener("resize", this.handleResize);

    this.downloadSucceed();

    this.handleResize();
    this.order = this.$route.params.order ? this.$route.params.order : 1;
    this.loadingPlay = true;
    this.getCourseDetail({
      courseId: this.$route.params.courseId,
      order: this.order,
      type: "1",
    }).then(() => {
      this.courseDetail.list.filter((item) => {
        if (item.order === this.order) {
          if (this.isDownloadedExist(item).length) {
            this.videoPlay = this.isDownloadedExist(item)[0];
            this.addLastWatch(this.videoPlay);
          } else {
            this.videoPlay = item;
            this.addLastWatch(this.videoPlay);
            this.lessonView(this.videoPlay._id).then((res) => {

              this.documents = res;
            });
          }
          this.lesson_id = item._id;
        }
      });
    });
    this.loadingPlay = false;
  },
};
</script>
<style>
svg.svg-inline--fa.fa-caret-right.fa-w-6 {
  width: 10px;
  color: #606060;
}

body {
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 0px;
}

#courseList::-webkit-scrollbar {
  width: 5px;
}

.percentage {
  -webkit-appearance: none;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, rgb(255, 14, 9) 0%, rgb(255, 255, 255) 0%);
  outline: none;
  box-shadow: 0px 1px 10px black;
  cursor: pointer;
}

.percentage {
  height: 3px;
  background: #ffffff;
  box-shadow: none;
}

.percentage::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: #ff0e09;
  cursor: pointer;
}

#feed::-webkit-scrollbar {
  width: 5px !important;
}

#feed::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3) !important;
}

#feed::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.5) !important;
}
</style>
