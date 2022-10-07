<template>
  <div
    id="video_player_box"
    class="flex-cols start items-center w-full relative"
  >
    <template v-if="true">
      <div class="bg-black">
        <video
          id="my_video"
          class="m-auto w-full"
          ref="my_video"
          :style="{ height: video.height + 'px', width: '100%' }"
          :poster="!url.includes('file:///') ? '/poster.png' : ''"
          autoplay="autoplay"
          controlsList="nodownload"
          @timeupdate="timeUpdate()"
          @ended="onEnded()"
          @pause="pause()"
          @click="playPause()"
        >
          <source :src="url" />
        </video>
      </div>
      <div
        class="
          absolute
          w-full
          left-0
          bottom-0
          py-5
          control
          bg-gradient-to-t
          from-gray-900
          z-50
        "
        :class="loadingVideo ? 'opacity-0' : ''"
      >
        <div class="px-5">
          <input
            type="range"
            min="0"
            max="100"
            id="seekSlider"
            value="0"
            step="1"
            ref="seekSlider"
            class="w-full seekSlider"
          />
        </div>
        <div class="flex justify-between items-center">
          <div class="flex justify-start px-5 pt-2">
            <button
              class="
                bg-transparent
                focus:outline-none
                mr-5
                transform
                rotate-180
              "
              @click="previousVideo()"
            >
              <NextIcon></NextIcon>
            </button>
            <button
              id="playPauseBtn"
              class="bg-transparent focus:outline-none mr-5"
              @click="playPause()"
            >
              <PlayIcon v-if="showPlay"></PlayIcon>
              <PauseIcon v-else></PauseIcon>
            </button>
            <button
              class="bg-transparent focus:outline-none mr-5"
              @click="nextVideo()"
            >
              <NextIcon></NextIcon>
            </button>

            <button
              id="muteBtn"
              class="mr-3 bg-transparent focus:outline-none"
              @click="vidMute()"
            >
              <SoundIcon v-if="!muted"></SoundIcon>
              <MutedIcon v-else></MutedIcon>
            </button>
            <div class="text-white mr-3 flex">
              <span id="currentTime"></span>
              <span id="currentDuration"></span>
            </div>
            <div class="w-20">
              <input
                id="volumeSlider"
                type="range"
                min="0"
                max="100"
                value="100"
                step="1"
                @change="setVolume($event)"
              />
            </div>
          </div>
          <div class="flex justify-start items-center px-5 relative">
            <div class="mr-5">
              <div class="cursor-pointer mt-2" @click="showOptionTool()">
                <SettingIcon></SettingIcon>
              </div>
              <!--Show option-->
              <div
                class="
                  absolute
                  bg-white
                  text-black text-14px
                  font-khmer_os
                  w-44
                  text-center
                  right-5
                  -top-46
                  rounded
                  shadow
                "
              >
                <ul v-if="showOption">
                  <li
                    class="
                      border border-l-0
                      -l-0
                      border-r-0 border-t-0 border-gray-200
                      h-10
                      leading-10
                      font-13px
                      text-gray-500
                    "
                  >
                    ការកំណត់
                  </li>
                  <li
                    class="
                      cursor-pointer
                      border border-l-0
                      -l-0
                      border-r-0 border-t-0 border-gray-200
                      h-9
                      leading-9
                      text-custom
                    "
                    @click="chooseOption(2)"
                  >
                    ល្បឿនវីដេអូ
                  </li>
                  <li
                    class="
                      cursor-pointer
                      border border-l-0
                      -l-0
                      border-r-0 border-t-0 border-gray-200
                      h-9
                      leading-9
                      text-custom
                    "
                    @click="chooseOption(1)"
                  >
                    កំរិតវីដេអូ
                  </li>
                  <li
                    class="
                      cursor-pointer
                      h-10
                      leading-10
                      text-red-500
                      font-semibold
                    "
                    @click="cancel()"
                  >
                    បោះបង់
                  </li>
                </ul>
              </div>
              <!--Show speed-->
              <div
                class="
                  absolute
                  bg-white
                  text-custom text-sm
                  font-khmer_os
                  w-44
                  text-center
                  right-5
                  -top-64
                  rounded
                  shadow
                "
              >
                <ul v-if="showSpeed">
                  <li
                    class="
                      border border-l-0
                      -l-0
                      border-r-0 border-t-0 border-gray-200
                      h-10
                      leading-10
                      font-13px
                      text-gray-500
                    "
                  >
                    ល្បឿន
                  </li>
                  <li
                    class="
                      cursor-pointer
                      border border-l-0
                      -l-0
                      border-r-0 border-t-0 border-gray-200
                      h-9
                      leading-9
                    "
                    :class="defaultSpeed < 1 ? 'text-red-500' : 'text-custom'"
                    @click="playbackRate(0.5)"
                  >
                    0.5x
                  </li>
                  <li
                    class="
                      cursor-pointer
                      border border-l-0
                      -l-0
                      border-r-0 border-t-0 border-gray-200
                      h-9
                      leading-9
                    "
                    :class="defaultSpeed === 1 ? 'text-red-500' : 'text-custom'"
                    @click="playbackRate(1)"
                  >
                    1.0x
                  </li>
                  <li
                    class="
                      cursor-pointer
                      border border-l-0
                      -l-0
                      border-r-0 border-t-0 border-gray-200
                      h-9
                      leading-9
                    "
                    :class="
                      defaultSpeed > 1 && defaultSpeed < 2
                        ? 'text-red-500'
                        : 'text-custom'
                    "
                    @click="playbackRate(1.5)"
                  >
                    1.5x
                  </li>
                  <li
                    class="
                      cursor-pointer
                      border border-l-0
                      -l-0
                      border-r-0 border-t-0 border-gray-200
                      h-9
                      leading-9
                    "
                    :class="defaultSpeed === 2 ? 'text-red-500' : 'text-custom'"
                    @click="playbackRate(2)"
                  >
                    2.0x
                  </li>
                  <li
                    class="
                      cursor-pointer
                      h-10
                      leading-10
                      text-red-500
                      font-semibold
                    "
                    @click="cancelOption()"
                  >
                    បោះបង់
                  </li>
                </ul>
              </div>
              <!--Show quality-->
              <div
                class="
                  absolute
                  bg-white
                  text-black text-14px
                  font-khmer_os
                  w-44
                  text-center
                  right-5
                  -top-46
                  rounded
                  shadow
                "
              >
                <ul v-if="showQuality">
                  <li
                    class="
                      border border-l-0
                      -l-0
                      border-r-0 border-t-0 border-gray-200
                      h-10
                      leading-10
                      font-13px
                      text-gray-500
                    "
                  >
                    កំរិត
                  </li>
                  <template>
                    <li
                      class="
                        cursor-pointer
                        border border-l-0
                        -l-0
                        border-r-0 border-t-0 border-gray-200
                        h-9
                        leading-9
                      "
                      v-for="(quality, index) in videoActive.links"
                      :key="index"
                      :class="
                        defaultQuality == quality.rendition
                          ? 'text-red-500'
                          : 'text-custom'
                      "
                      @click="changeQuality(quality.rendition)"
                    >
                      {{ quality.rendition }}
                    </li>
                  </template>
                  <li
                    class="
                      cursor-pointer
                      h-10
                      leading-10
                      text-red-500
                      font-semibold
                    "
                    @click="cancelOption()"
                  >
                    បោះបង់
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="cursor-pointer mt-2"
              id="fullScreenBtn"
              @click="toggleFullScreen()"
            >
              <FullScreenIcon></FullScreenIcon>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="w-full flex-cols justify-center items-center">
        <video
          id="my_video"
          class="m-auto w-full bg-black"
          :poster="!url.includes('file:///') ? '/poster.png' : ''"
          autoplay="autoplay"
          controlsList="nodownload"
          @timeupdate="timeUpdate()"
          @ended="onEnded()"
          @pause="pause()"
          @click="playPause()"
          :style="{ height: video.height + 'px' }"
        >
          <source
            src="https://eschool-video.sabay.com/video/Diploma-English/EssentialBook3(Micha)/5f27c1c981768d50365d40d2-2_720.mp4"
          />
        </video>
      </div>
    </template>
  </div>
</template>
<script>
import PlayIcon from "./PlayIcon";
import PauseIcon from "./PauseIcon";
import NextIcon from "./NextIcon";
import MutedIcon from "./MutedIcon";
import SoundIcon from "./SoundIcon";
import SettingIcon from "./SettingIcon";
import FullScreenIcon from "./FullScreenIcon";
import { mapActions, mapState } from "vuex";
export default {
  name: "MediaPlayer",
  components: {
    PlayIcon,
    SettingIcon,
    SoundIcon,
    PauseIcon,
    NextIcon,
    MutedIcon,
    FullScreenIcon,
  },
  props: {
    last_watch: {
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      video: {
        height: 355,
      },
      url: "",
      showPlay: false,
      muted: false,
      vid: null,
      btn: null,
      currentWatch: "",
      seekSlider: null,
      currentTime: null,
      currentDuration: null,
      muteBtn: null,
      volumeSlider: null,
      fullScreenBtn: null,
      showOption: false,
      showSpeed: false,
      showQuality: false,
      defaultSpeed: 1,
      defaultQuality: "",
      resources: [],
      LoadingWhiteSuccess: false,
      loadingVideo: false,
      oldVolume: 0,
      oldVolumeRange: 0,
    };
  },
  computed: {
    ...mapState("playVideo", ["loadingNextVideo", "stop_watch"]),
    ...mapState("course", ["videoActive"]),
    style() {
      return "background-color: " + this.hovering ? this.color : "red";
    },
    videoActiveChange() {
      return this.$store.state.course.videoActive;
    },
  },
  methods: {
    ...mapActions("playVideo", ["setLastWatch", "gettingNextVideo"]),

    clearVideo() {},

    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    changeQuality(quality) {
      if (quality === "") {
        this.showQuality = false;
        return;
      }

      this.LoadingWhiteSuccess = false;
      if (quality === this.defaultQuality) {
        this.showQuality = false;
        this.LoadingWhiteSuccess = true;
        return;
      }
      this.defaultQuality = quality;

      this.url = this.videoActive.links
        .filter((item) => item.rendition === quality)
        .map((item) => item.link)[0];
      this.vid.setAttribute("src", this.url);

      this.vid.load();
      this.vid.currentTime = this.currentWatch;
      this.playPause();

      this.LoadingWhiteSuccess = true;
      this.showQuality = false;
    },
    playbackRate(rate) {
      this.defaultSpeed = rate;
      this.showSpeed = false;
      this.vid.playbackRate = rate;
    },
    chooseOption(option) {
      if (option === 1) {
        this.showQuality = true;
      }
      if (option === 2) {
        this.showSpeed = true;
      }
      this.showOption = false;
    },
    showOptionTool() {
      if (this.showSpeed || this.showQuality) {
        this.showOption = false;
      } else {
        this.showOption = !this.showOption;
      }
      this.showSpeed = false;
      this.showQuality = false;
    },
    cancel() {
      this.showOption = false;
      this.showSpeed = false;
      this.showQuality = false;
    },
    cancelOption() {
      this.showOption = true;
      this.showSpeed = false;
      this.showQuality = false;
    },
    pause() {
      //                this.lastWatchVideo()
      this.showPlay = true;
    },
    lastWatchVideo() {
      this.$emit("lastWatchVideo", {
        mark: this.vid.currentTime,
        duration: this.vid.duration,
      });
    },
    playPause() {
      if (this.showOption) {
        this.showOption = false;
        return;
      }
      if (this.showSpeed) {
        this.showSpeed = false;
        return;
      }
      if (this.showQuality) {
        this.showQuality = false;
        return;
      }

      if (this.vid.paused) {
        this.vid.play();
        this.showPlay = false;
      } else {
        this.vid.pause();
        this.showPlay = true;
        this.lastWatchVideo();
      }
    },
    onEnded() {
      let color = `linear-gradient(90deg, rgb(255, 14, 9) 100%, rgb(214,214,214) 100%)`;
      this.seekSlider.style.background = color;
      this.showOption = false;
      this.lastWatchVideo();
      this.$emit("onPlayerEnded");

      this.vid = "";
      this.currentDuration = "";
      this.currentWatch = "";
    },
    nextVideo() {
      this.lastWatchVideo();
      this.showOption = false;
      this.$emit("onPlayerEnded");
    },
    previousVideo() {
      this.showOption = false;
      this.$emit("previousVideo");
    },
    vidMute() {
      if (this.vid.muted) {
        this.vid.muted = false;
        this.muted = false;
        this.vid.volume = this.oldVolume ? this.oldVolume : 1;
        this.volumeSlider.value = this.oldVolumeRange
          ? this.oldVolumeRange
          : 100;
      } else {
        this.muted = true;
        this.vid.muted = true;
        this.vid.volume = 0;
        this.volumeSlider.value = 0;
      }
    },
    setVolume(event) {
      this.vid.volume = this.volumeSlider.value / 100;
      this.oldVolume = this.volumeSlider.value / 100;
      this.oldVolumeRange = event.target.value;

      if (event.target.value === "0") {
        this.vid.muted = true;
        this.muted = true;
      } else {
        this.muted = false;
      }
    },
    toggleFullScreen() {
      if (this.vid.requestFullScreen) {
        this.vid.requestFullScreen();
      } else if (this.vid.webkitRequestFullScreen) {
        this.vid.webkitRequestFullScreen();
      } else if (this.vid.mozRequestFullScreen) {
        this.vid.mozRequestFullScreen();
      }
    },
    timeUpdate() {
      let nt = Math.floor(this.vid.currentTime * (100 / this.vid.duration));
      let color = `linear-gradient(90deg, rgb(255, 14, 9) ${nt}%, rgb(214,214,214) ${nt}%)`;
      this.seekSlider.style.background = color;
      this.currentWatch = this.vid.currentTime;

      let curmins = Math.floor(this.vid.currentTime / 60);
      let cursecs = Math.floor(this.vid.currentTime - curmins * 60);
      let durmins = Math.floor(this.vid.duration / 60);
      let dursecs = Math.floor(this.vid.duration - durmins * 60);
      if (cursecs < 10) {
        cursecs = "0" + cursecs;
      }
      if (dursecs < 10) {
        dursecs = "0" + dursecs;
      }
      if (curmins < 10) {
        curmins = "0" + curmins;
      }
      if (durmins < 10) {
        durmins = "0" + durmins;
      }
      if (curmins && cursecs) {
        this.currentTime.innerHTML = curmins + ":" + cursecs + "&nbsp;";
      }
      if (durmins && dursecs) {
        this.currentDuration.innerHTML = "/&nbsp;" + durmins + ":" + dursecs;
      }
    },
    getVideo() {
      let interval = setInterval(() => {
        if (document.getElementById("my_video") !== null) {
          clearInterval(interval);
          this.vid = document.getElementById("my_video");
          this.vid.currentTime = this.last_watch;
          this.vid.addEventListener("loadstart", () => {
            this.loadingVideo = true;
          });
          this.vid.addEventListener("canplaythrough", () => {
            this.loadingVideo = false;
          });
          this.vid.addEventListener("waiting", () => {
            this.loadingVideo = true;
          });

          this.btn = document.getElementById("playPauseBtn");
          this.seekSlider = document.getElementById("seekSlider");
          if (this.last_watch) {
            this.vid.currentTime = this.last_watch;
          }
          this.seekSlider.addEventListener(
            "input",
            (event) => {
              let seekTo = this.vid.duration * (event.target.value / 100);
              let color = `linear-gradient(90deg, rgb(255, 14, 9) ${event.target.value}%, rgb(214,214,214) ${event.target.value}%)`;
              this.seekSlider.style.background = color;
              this.seekSlider.style.background = color;
              this.vid.currentTime = seekTo;
              this.$emit("updateLastWatch", seekTo);
              this.lastWatchVideo();
            },
            true
          );

          this.currentTime = document.getElementById("currentTime");
          this.currentDuration = document.getElementById("currentDuration");
          this.muteBtn = document.getElementById("muteBtn");
          this.volumeSlider = document.getElementById("volumeSlider");
          this.fullScreenBtn = document.getElementById("fullScreenBtn");

          if (this.oldVolumeRange) {
            this.volumeSlider.value = this.oldVolumeRange;
          }
          if (this.oldVolume) {
            this.vid.volume = this.oldVolume;
          }

          if (this.muted) {
            this.vid.muted = true;
          }
        }
      }, 200);
    },
    getUrl() {
      this.url = this.videoActive.links
        .filter(
          (item) =>
            item.rendition ==
            this.videoActive.links[this.videoActive.links.length - 1][
              "rendition"
            ]
        )
        .map((item) => item.link)[0];
      this.defaultQuality =
        this.videoActive.links[this.videoActive.links.length - 1]["rendition"];
    },
  },
  mounted() {
    this.getVideo();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  created() {
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.keyCode === 39) {
          this.vid.currentTime += 10;
        }
        if (e.keyCode === 37) {
          if (this.vid.currentTime > 10) {
            this.vid.currentTime -= 10;
          }
          if (this.vid.currentTime > 1 && this.vid.currentTim < 10) {
            this.vid.currentTime -= 1;
          }
        }
      },
      false
    );
    window.addEventListener("resize", this.handleResize);

    this.handleResize();
    if (this.window.width > 1440) {
      this.video.height = 538;
    } else if (this.window.width <= 1440) {
      this.video.height = 380;
    } else if (this.window.width <= 1366) {
      this.video.height = 355;
    }
    this.getUrl();
  },
  watch: {
    videoActiveChange: function () {
      this.getUrl();
      this.vid.setAttribute("src", this.url)

    },
  },
};
</script>
<style>
/*, #volumeSlider*/
.seekSlider,
#volumeSlider {
  -webkit-appearance: none;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, rgb(255, 14, 9) 0%, rgb(214, 214, 214) 0%);
  outline: none;
  box-shadow: 0px 1px 10px black;
  cursor: pointer;
}

#volumeSlider {
  height: 3px;
  background: #ffffff;
  box-shadow: none;
}

.seekSlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 3px;
  height: 3px;
  background: #ff0e09;
  cursor: pointer;
}

#volumeSlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: #fff;
  cursor: pointer;
  border-radius: 50%;
}

.control {
  opacity: 0;
}

#video_player_box:hover .control {
  transition: opacity 0.5s;
  opacity: 1;
}
</style>
