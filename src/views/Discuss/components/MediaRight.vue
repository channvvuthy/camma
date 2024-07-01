<template>
  <div class="flex-cols" @contextmenu="handler($event)">
    <div class="flex items-center justify-end">
      <div>
        <p class="opacity-80 text-right mt-2 mb-0" style="font-size: 12px">
          You
        </p>
        <p class="text-lg text-right opacity-40 mb-1 text-gray-700 ml-2" style="font-size: 11px">
          {{ getDay(chat.date) }}
        </p>
      </div>
    </div>
    <div class="flex items-center justify-end">
      <div class="chat text-right w-1/2">
        <div class="float-right bg-gray-200 break-all px-2 py-1" :class="stringLength(chat.content.value) > 50
          ? 'rounded-2xl'
          : 'rounded-full '
          " v-html="mention(chat.content.value)" v-if="chat.content.type === 1"></div>
        <div class="float-right">
          <ImageView :chat="chat" v-if="chat.content.type === 2" justify="end"></ImageView>
        </div>
        <Audio :chat="chat" v-if="chat.content.type === 3" class="float-right"></Audio>
      </div>
    </div>
    <div class="fixed items-center justify-center w-full h-full bg-black bg-opacity-10 flex left-0 top-0 z-50"
      v-if="isDelete">
      <div class="rounded-2xl bg-white w-72">
        <div class="h-10 flex items-center justify-center text-lg font-semibold border-b">Confirm </div>
        <div class="p-5">Are you going to delete this message?</div>
        <div class="flex justify-end p-3 border-t">
          <div class="bg-gray-300 p-2 rounded-lg px-3 mr-5 cursor-pointer" @click="isDelete = false">Cancel</div>
          <div class="bg-red-500 text-white p-2 rounded-lg px-3 cursor-pointer" @click="removeMessage">Delete</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import helper from "./../../../helper/helper";
import moment from "moment";
import Audio from "./Audio";
import ImageView from "./Image";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isDelete: false,
    }
  },
  components: {
    Audio,
    ImageView,
  },
  props: {
    chat: {},
  },
  methods: {
    ...mapActions('chat', ['deleteMessage']),

    removeMessage() {
      this.isDelete = false;
      this.deleteMessage(this.chat._id);
    },
    getDay(oldDate) {
      if (helper.numDay(oldDate, moment().format()) === 0) {
        return moment(oldDate).format("h:mm:ss");
      }
      return moment(oldDate).format("DD-MM-YYYY");
    },
    handler() {
      this.isDelete = true;
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