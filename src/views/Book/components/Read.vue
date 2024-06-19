<template>
  <div class="fixed flex flex-col items-center justify-center w-full h-full  left-0 top-0 z-50 bg-black bg-opacity-80"
    id="dismiss" @click="dismiss">
    <div class="bg-white relative" style="width: 595px; z-index: 3000">
      <div
        class="cursor-pointer absolute w-8 h-8 bg-custom rounded-full flex items-center justify-center -right-5 -top-5 z-50"
        @click="() => { this.$emit('closeReading', true); }">
        <CloseIcon :size="20" fill="#FFF" />
      </div>
    </div>
    <div class="bg-white rounded-xl relative" style="width: 595px" id="pdf">
      <div class="border-b rounded-t-xl flex items-center px-5 justify-between bg-white py-3">
        <div :title="title">{{ cutString(title, 65) }}</div>
        <div class="flex items-center">
          <div class="cursor-pointer" @click="toggleFullScreen">
            <FullScreenIcon :size="18" />
          </div>
          <div class="w-5"></div>
          <div class="cursor-pointer" @click="showListBook()">
            <ListIcon :width="20" :height="20" />
          </div>
        </div>
      </div>

      <!-- List all boooks -->
      <div class="w-full z-50  top-12 bg-white" v-if="isList">
        <ul class="px-5">
          <li v-for="(book, index) in books.list" :key="index" class="py-3 border-b cursor-pointer"
            @click="readNewBook(book)">
            {{ book.title }}
          </li>
        </ul>
      </div>

      <!-- Loading -->
      <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50" v-if="loading">
        <Loading />
      </div>
      <div class="rounded-b-2xl overflow-y-hidden" :style="{ height: `${height - 100}px` }">
        <div class="overflow-y-scroll scroll-pdf" :style="{ height: `${height - 100}px` }">
          <vue-pdf-embed :source="pdfUrl" @loaded="loaded" @rendered="rendered" @rendering-failed="renderingFailed" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import VuePdfEmbed from "vue-pdf-embed/dist/vue2-pdf-embed";
import CloseIcon from "./../../../components/CloseIcon.vue";
import FullScreenIcon from "./../../../components/FullScreenIcon.vue";
import ListIcon from "./../../../components/ListIcon.vue";
import Loading from "./../../../components/Loading.vue";
import helper from "./../../../helper/helper";

export default {
  components: {
    VuePdfEmbed,
    CloseIcon,
    FullScreenIcon,
    ListIcon,
    Loading,
  },
  props: {
    books: {
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      pdfUrl: "",
      title: "",
      isList: false,
      loading: false,
      height: window.innerHeight
    };
  },
  methods: {
    renderingFailed() {
      console.log("renderingFailed");
    },
    loaded() {
      this.loading = false;
    },
    rendered() {
      this.loading = false;
    },
    showListBook() {
      this.isList = !this.isList;
    },
    readNewBook(book) {
      this.isList = false;
      this.pdfUrl = book.pdf_url;
      this.title = book.title;
    },
    toggleFullScreen() {
      var el = document.getElementById("pdf");

      if (el.requestFullscreen) {
        document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        document.webkitFullscreenElement ? document.webkitExitFullscreen() : el.webkitRequestFullscreen();
      } else if (el.mozRequestFullScreen) {
        document.mozFullScreenElement ? document.mozCancelFullScreen() : el.mozRequestFullScreen();
      }
    }
    ,
    cutString(text, limit) {
      if (text) {
        return helper.cutString(text, limit);
      }
    },
    dismiss(event) {
      if (event.target.id == "dismiss") {
        this.$emit("closeReading", true);
      }
    },
  },
  created() {
    this.loading = true;
    this.pdfUrl = this.books.list.map((item) => item.pdf_url)[0];
    console.log(this.pdfUrl)
    this.title = this.books.list.map((item) => item.title)[0];
  },
};
</script>
<style>
.scroll-pdf::-webkit-scrollbar {
  width: 10px !important;
}

.scroll-pdf::-webkit-scrollbar-thumb {
  background-color: #ddd !important;
  border-radius: 5px !important;
}

.scroll-pdf::-webkit-scrollbar-track {
  background: #f1f1f1 !important;
}
</style>