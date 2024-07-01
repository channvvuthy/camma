<template>
  <div class="flex-cols">
    <div class="flex items-center">
      <div class="w-14 h-14 rounded-full bg-center bg-gray-200 bg-cover" :style="{
        backgroundImage: `url(${chat.sender.photo})`,
      }"></div>
      <div>
        <h3 class="font-khmer_os text-sm text-gray-900 ml-2">
          {{ chat.sender.name }}
        </h3>
        <p class="text-xs opacity-40 mb-2 text-gray-700 ml-2">
          {{ getDay(chat.date) }}
        </p>
      </div>
    </div>
    <div class="flex items-center justify-start my-5">
      <div class="chat text-left w-1/2">
        <div class="float-left bg-gray-200 break-all px-3 py-2 rounded-2xl" v-html="mention(chat.content.value)"
          v-if="chat.content.type === 1"></div>
        <ImageView :chat="chat" v-if="chat.content.type === 2"></ImageView>
        <img v-if="chat.content.type === 2" />
        <Audio :chat="chat" v-if="chat.content.type === 3"></Audio>
      </div>
    </div>
  </div>
</template>
<script>
import helper from "./../../../helper/helper";
import moment from "moment";
import Audio from "./Audio";
import ImageView from "./Image";
export default {
  name: "MediaLeft",
  components: {
    Audio,
    ImageView,
  },
  props: {
    chat: {},
  },
  methods: {
    getDay(oldDate) {
      if (helper.numDay(oldDate, moment().format()) === 0) {
        return moment(oldDate).format("h:mm:ss");
      }
      return moment(oldDate).format("DD-MM-YYYY");
    },
    stringLength(string) {
      return string.length;
    },
    mention(str) {
      return str
        .replace(/[@]\[/g, "<span class='text-blue-500'>")
        .replace(/\]/g, "</span>");
    },
  },
};
</script>