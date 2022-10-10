<template>
  <div class="flex-cols">
    <div class="flex items-center justify-end">
      <div>
        <p class="opacity-80 text-right mt-2 mb-0" style="font-size: 12px">
          You
        </p>
        <p
          class="text-lg text-right opacity-40 mb-1 text-gray-700 ml-2"
          style="font-size: 11px"
        >
          {{ getDay(chat.date) }}
        </p>
      </div>
    </div>
    <div class="flex items-center justify-end">
      <div class="chat text-right w-1/2">
        <div
          class="float-right bg-gray-200 break-all px-2 py-1"
          :class="
            stringLength(chat.content.value) > 50
              ? 'rounded-2xl'
              : 'rounded-full '
          "
          v-html="mention(chat.content.value)"
          v-if="chat.content.type === 1"
        ></div>
        <div class="float-right">
          <ImageView
            :chat="chat"
            v-if="chat.content.type === 2"
            justify="end"
          ></ImageView>
        </div>
        <Audio
          :chat="chat"
          v-if="chat.content.type === 3"
          class="float-right"
        ></Audio>
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
  name: "MediaRight",
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
      } else {
        return moment(oldDate).format("DD-MM-YYYY");
      }
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