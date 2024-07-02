<template>
  <div class="bg-white h-screen">
    <div v-if="loadingGroup" class="flex justify-center items-center h-screen relative -top-5">
      <h1 class="text-sm font-semibold font-khmer_os relative -top-10">
        <loading></loading>
      </h1>
    </div>
    <div v-else>
      <div v-if="!groups.length" class="flex justify-center pt-5 h-screen">
        <img src="/icon/Empty/Empty.svg" class="w-64 mb-5 relative -top-20" />
      </div>
      <div v-if="groups && groups.length" class="flex font-khmer_os">
        <ul class="
            w-1/3
            border border-gray-200 border-b-0 border-l-0 border-t-0
            h-screen
            overflow-y-scroll
          ">
          <li v-for="(group, key) in groups" :key="key" @click="readChat(key, group._id)"
            :class="active === key || active === group._id ? 'bg-gray-50' : ''" class="
              text-14px
              cursor-pointer
              flex
              justify-start
              items-center
              px-5
              border border-gray-100 border-t-0 border-l-0 border-r-0
              py-3
            ">
            <div class="w-14 h-14 rounded-full mr-3 shadow bg-center" :style="{
              backgroundImage: `url(${group.thumbnail})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }"></div>
            <div class="flex-cols">
              <div>
                {{ group.name }}
              </div>
              <div class="mt-1 text-13px opacity-40">
                {{ formatDate(group.last_message) }}
              </div>
            </div>
          </li>
        </ul>

        <div class="h-screen relative w-2/3">
          <div class="boxChat overflow-y-scroll pt-3 px-5 h-full" ref="feed" id="feed" @scroll="onScroll"
            @mouseover="enableScroll">
            <div class="flex justify-center">
              <img src="/ajax-loader.gif" :class="readingChat || readingChatPagination ? 'visible' : 'invisible'
                " />
            </div>
            <div class="chat text-13px">
              <div v-if="uniqueChats && uniqueChats.length > 0">
                <div v-for="(chat, key) in uniqueChats" :key="key">
                  <!-- Their -->
                  <div v-if="chat.sender._id != stProfile._id && chat.is_delete == 0">
                    <MediaLeft :chat="chat" />
                  </div>

                  <!-- Deleted message -->
                  <div v-if="chat.is_delete">
                    <MyRemoveMessage :chat="chat" v-if="chat.sender._id == stProfile._id" />
                    <TheirRemoveMessage :chat="chat" v-else />

                  </div>

                  <!-- Mine -->
                  <div v-if="chat.sender._id == stProfile._id && (chat.is_delete == undefined || chat.is_delete == 0)">
                    <MediaRight :chat="chat" />
                  </div>

                </div>

              </div>
            </div>
            <div class="h-40">&nbsp;</div>
          </div>
          <div class="
              border border-gray-200
              h-48
              overflow-y-scroll
              w-48
              rounded-lg
              absolute
              bottom-32
              left-4
              bg-white
              mb-2
            " v-if="showMention">
            <ul>
              <li v-for="(mention, key) in mentions" :key="key" class="py-1 cursor-pointer hover:bg-gray-50 px-3"
                @click="replaceMention(mention.name)">
                {{ mention.name }}
              </li>
            </ul>
          </div>
          <div class="
              flex
              items-center
              justify-start
              pb-3
              w-full
              absolute
              bottom-17
              left-0
              px-4
              bg-white
            ">
            <form>
              <input type="file" class="hidden" ref="photo" @change="onFileChange"
                accept="image/x-png,image/gif,image/jpeg" />
            </form>
            <div class="cursor-pointer mr-3" @click="choosePhoto">
              <ImageIcon :size="50" fill="#40b366" />
            </div>
            <div class="cursor-pointer rounded-full mr-3 mt-2" :class="busy ? 'opacity-30' : ''">
              <vue-record-audio @result="onResult" @stream="onStream" />
            </div>
            <img src="/ajax-loader.gif" class="absolute right-10 top-5" v-if="uploadingPhoto" />
            <textarea class="
                border border-gray-300
                rounded-full
                text-13px
                pl-5
                pt-2
                h-10
                focus:outline-none
                w-full
                resize-none
              " v-model="message.text" placeholder="ពិភាក្សាទីនេះ..." ref="message" name="message"
              @keydown="enableWatch" @keyup.enter.exact="makeConversation"></textarea>
          </div>
        </div>
      </div>
    </div>
    <ImgFull v-if="showImgFull" :Url="img" @hideFullImage="hideFullImage"></ImgFull>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import ImageIcon from "./../../components/ImageIcon";
import getBlobDuration from "get-blob-duration";
import helper from "./../../helper/helper";
import config from "./../../config";
import ImgFull from "./components/ImgFull";
import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import MediaLeft from "./components/MediaLeft";
import MediaRight from "./components/MediaRight";
import MyRemoveMessage from "./components/MyRemoveMessage";
import TheirRemoveMessage from "./components/TheirRemoveMessage";
import Loading from "./../../components/Loading";
import VueRecord from "@codekraft-studio/vue-record";

Vue.use(VueRecord);
Vue.use(
  new VueSocketIO({
    connection: config.urlSocket,
  })
);

export default {
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
  },
  name: "Discuss",
  components: {
    ImageIcon,
    ImgFull,
    MediaLeft,
    MediaRight,
    Loading,
    MyRemoveMessage,
    TheirRemoveMessage
  },
  data() {
    return {
      audioUrl: "",
      showAt: false,
      isConnected: false,
      socketMessage: "",
      soundUrl: config.baseUrl + "files/sound/",
      imgUrl: config.baseUrl + "files/img/",
      showImgFull: false,
      active: 0,
      img: "",
      page: 1,
      userScroll: false,
      uploadingPhoto: false,
      showMention: false,
      mentionList: [],
      mentionReplaced: false,
      socket: {},
      message: {
        group_id: "",
        text: "",
        photo: "",
        sound: "",
        duration: 0,
      },
      duration: null,
      busy: false,
    };
  },
  computed: {
    ...mapState("chat", [
      "groups",
      "loadingGroup",
      "readingChat",
      "chats",
      "loadAddingChat",
      "readingChatPagination",
      "mentions",
      "loadingMention",
    ]),
    ...mapState("auth", ["stProfile"]),
    pageOffsetTop: {
      get() {
        return this.$store.state.chat.chats.length;
      },
      set(numPage) {
        return numPage;
      },
    },
    uniqueChats() {
      // Function to filter unique chat objects based on _id or another unique identifier
      function getUniqueChats(array) {
        return Array.from(array.reduce((map, obj) => {
          if (!map.has(obj._id)) map.set(obj._id, obj);
          return map;
        }, new Map()).values());
      }

      // Return unique chats array
      return getUniqueChats(this.chats);
    }
  },

  methods: {
    ...mapActions("chat", [
      "getGroupChat",
      "readingGroupChat",
      "addChat",
      "readingGroupChatting",
      "addingLocalChat",
      "getMention",
    ]),
    formatDate(date) {
      moment.locale("en");
      return moment(date).format("DD-MM-YYYY h:mm");
    },
    onStream() {
      this.audioUrl = "";
    },
    blobToFile(theBlob, fileName) {
      return new File([theBlob], fileName, {
        lastModified: new Date().getTime(),
        type: "audio/mpeg",
      });
    },
    getAudioDuration(blob) {
      return new Promise((resolve) => {
        resolve(getBlobDuration(blob));
      });
    },
    onMessage(type = 1, text) {
      let message = {
        id: Math.floor(Date.now() / 1000),
        date: moment().format(),
        content: {
          type: type,
          value: text,
        },
        sender: {
          name: "",
          photo: "",
          _id: this.stProfile._id,
        },
      };
      this.addingLocalChat(message);
    },
    onResult(data) {
      this.getAudioDuration(data).then((duration) => {
        let group_id = this.message.group_id;
        let sound = this.blobToFile(data, `${this.makeID(10)}.wav`);

        let reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          const formData = new FormData();

          formData.append("group_id", group_id);
          formData.append("sound", sound);
          formData.append("duration", duration);

          this.addChat(formData);
          this.scrollToBottom();
        };
      });
    },
    enableWatch() {
      this.mentionReplaced = false;
    },

    hideFullImage() {
      this.showImgFull = false;
      this.img = "";
    },

    makeID(length) {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },

    readChat(index, id) {
      this.message.text = "";
      this.userScroll = false;
      this.page = 1;
      this.message.group_id = id;
      this.active = index;
      this.readingGroupChat({
        group_id: id,
        page: this.page,
      }).then(() => {
        this.scrollToBottom();
      });
    },
    enableScroll() {
      this.userScroll = true;
    },
    getDay(oldDate) {
      if (helper.numDay(oldDate, moment().format()) === 0) {
        return moment(oldDate).format("h:mm:ss");
      } else {
        return moment(oldDate).format("D-MM-YYYY");
      }
    },

    choosePhoto() {
      this.$refs.photo.click();
    },

    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("group_id", this.message.group_id);
      formData.append("photo", file);

      this.uploadingPhoto = true;

      this.addChat(formData)
        .then(() => {
          this.uploadingPhoto = false;
          this.scrollToBottom();
        })
        .finally(() => {
          this.$refs.photo.value = null;
        });
    },
    makeConversation(e) {
      e.preventDefault();

      if (this.message.text.trim() === "") {
        return false;
      }

      this.message.text = this.message.text.replace(/\n+$/, "");

      let uniqueMentions = Array.from(new Set(this.mentionList));

      uniqueMentions.forEach(mention => {
        this.message.text = this.message.text.replace(
          mention,
          `@[${mention.substring(1)}]`
        );
      });

      this.addChat(this.message);
      // this.onMessage(1, this.message.text);

      this.message.text = "";
      this.message.photo = "";
      this.scrollToBottom();
    },
    stringLength(string) {
      return string.length;
    },
    mention(str) {
      return str
        .replace(/[@]\[/g, "<span class='text-blue-500'>")
        .replace(/\]/g, "</span>");
    },
    onScroll({ target: { scrollTop } }) {
      if (!scrollTop && this.userScroll === true) {
        this.page = Math.floor(this.pageOffsetTop / 20) + 1;
        this.readingGroupChatting({
          group_id: this.message.group_id,
          page: this.page,
        }).then((response) => {
          if (response && response.length) {
            this.scrollToTop();
          }
        });
      }
    },
    scrollToTop() {
      setTimeout(() => {
        this.$refs.feed.scrollTop = 10;
      }, 50);
    },
    scrollToBottom() {
      let interval = setInterval(() => {
        try {
          this.$refs.feed.scrollTop =
            this.$refs.feed.scrollHeight - this.$refs.feed.clientHeight;
          this.pageOffsetTop = 1;
        } catch (err) {
          return err;
        }
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
      }, 500);
    },
    replaceMention(value) {
      let mention = "@" + value;
      this.mentionList.push(mention);

      this.mentionReplaced = true;
      this.showMention = false;
      let textArea = document.getElementsByName("message")[0];
      let startPos = textArea.selectionStart,
        // get cursor's position:
        endPos = textArea.selectionEnd,
        cursorPos = startPos,
        tmpStr = textArea.value;

      if (value === null) {
        return;
      }

      let a =
        tmpStr.substring(
          tmpStr.substring(0, startPos).lastIndexOf("@"),
          startPos
        ) + value;
      this.message.text =
        tmpStr.substring(0, startPos) +
        value +
        tmpStr.substring(endPos, tmpStr.length);
      this.message.text = this.message.text.replace(a, "@" + value);

      // move cursor:
      setTimeout(() => {
        cursorPos += value.length;
        textArea.selectionStart = textArea.selectionEnd = cursorPos;
      }, 50);

      this.$refs.message.focus();
    },

    getSecondPart(str) {
      return str.split("@").pop();
    },
  },
  created() {
    this.sockets.subscribe("message", (data) => {
      if (data.group_id === this.message.group_id) {
        if (data.sender._id !== this.stProfile._id) {
          this.addingLocalChat(data);
          this.scrollToBottom();
        }
      }
    });

    this.getGroupChat(this.page).then((response) => {
      this.message.group_id = response.map((e) => e._id)[0];
      this.readingGroupChat({
        group_id: this.message.group_id,
        page: this.pageOffsetTop,
      }).then(() => {
        let interval = setInterval(() => {
          try {
            this.$refs.feed.scrollTop =
              this.$refs.feed.scrollHeight - this.$refs.feed.clientHeight;
            this.pageOffsetTop = 1;
          } catch (err) {
            return err;
          }
        }, 50);

        setTimeout(() => {
          clearInterval(interval);
        }, 500);
      });
    });
  },
  watch: {
    "message.text": function (value) {
      if (this.mentionReplaced) {
        return;
      }
      this.showMention = false;
      if (value.includes("@"))
        if (this.getSecondPart(value).length <= 5) {
          this.getMention({
            group_id: this.message.group_id,
            name: this.getSecondPart(value),
          }).then((response) => {
            if (response && response.length) {
              this.showMention = true;
            } else {
              this.showMention = false;
            }
          });
        } else {
          this.showMention = false;
        }
    },
  },
};
</script>
<style>
ul li:last-child {
  border: 0px !important;
}

.vue-audio-recorder {
  background-color: #40b366 !important;
  width: 40px !important;
  height: 40px !important;
}

.vue-audio-recorder:hover {
  background-color: #40b366 !important;
}

.vue-audio-recorder span:after {
  top: 55% !important;
  left: 42% !important;
  width: 21% !important;
  height: 29% !important;
}

.vue-audio-recorder:before {
  top: 41% !important;
  left: 41% !important;
  height: 15% !important;
  width: 18% !important;
  border-bottom-left-radius: 50% !important;
  border-bottom-right-radius: 50% !important;
}

.vue-audio-recorder:after {
  top: 21% !important;
  left: 41% !important;
  height: 20% !important;
  width: 18% !important;
  border-top-left-radius: 50% !important;
  border-top-right-radius: 50% !important;
}

.vue-audio-recorder span {
  position: absolute;
  top: 50% !important;
  left: 31% !important;
  height: 34% !important;
  width: 38% !important;
  overflow: hidden;
}

.vue-audio-recorder span:before {
  border: 0.157em solid #fff;
}
</style>