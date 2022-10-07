<template>
  <div class="fixed z-50 inset-0 overflow-y-auto">
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        text-center
        sm:block sm:p-0
      "
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="
          inline-block
          align-bottom
          text-left
          transform
          transition-all
          sm:align-middle
        "
        :class="`w-${size}`"
      >
        <div class="bg-white font-khmer_os rounded-xl">
          <!--Header-->
          <div class="flex justify-between items-center p-3">
            <div class="flex-1 text-center">
              {{ LessonTitle }}
            </div>
            <div class="flex">
              <div
                class="cursor-pointer mr-5 opacity-60"
                @click="openFullscreen()"
                title="Full Screen Or Press Esc to Exit"
              >
                <FullScreenIcon :size="15" />
              </div>
              <div class="cursor-pointer opacity-60 mr-3" @click="showListData">
                <ListIcon :width="15" :height="15" />
              </div>
              <div
                class="cursor-pointer -top-5 -right-5 bg-custom absolute h-8 w-8 flex items-center justify-center rounded-full"
                @click="closeReading"
              >
                <CloseIcon fill="#FFF" :size="22" />
              </div>
            </div>
          </div>
          <hr />
          <!--Body-->
          <div style="overflow-y: scroll" class="h-85" id="fullScreen">
            <div v-if="!showList">
              <div
                v-if="loading"
                class="flex justify-center items-center"
                :style="
                  window.width <= '1366' ? 'height:600px;' : 'height:800px;'
                "
              >
                <Loading />
              </div>
              <div v-else>
                <div v-if="pdfFile && !loading">
                  <pdf
                    v-for="i in numPages"
                    :key="i"
                    :src="pdfFile"
                    @error="log"
                    :page="i"
                  ></pdf>
                </div>
                <div
                  class="flex justify-center items-center h-85"
                  v-if="!books.is_buy && !books.book.price.year"
                >
                  <div class="focus:outline-none">
                    <div>សូមធ្វើការទិញថ្នាក់នេះជាមុនសិន</div>
                    <button
                      class="
                        flex
                        justify-center
                        text-center
                        hover:opacity-80
                        focus:outline-none
                        m-auto
                        items-center
                        bg-custom
                        px-3
                        py-2
                        mt-3
                        text-white
                        rounded-full
                      "
                      @click="buy(books.book._id)"
                    >
                      <CartIcon />
                      <span class="ml-1">ទិញថ្នាក់នេះ</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <ul>
                <li
                  class="
                    flex
                    cursor-pointer
                    text-13px
                    border border-gray-200 border-t-0 border-l-0 border-r-0
                    py-3
                    px-3
                  "
                  v-for="(book, key) in books.list"
                  :key="key"
                  @click="readingCourse(book, books.is_buy)"
                >
                  <div class="mr-3">
                    <template v-if="books.is_buy === 1">
                      <CheckIcon fill="#009e03" :width="20" :height="20" />
                    </template>
                    <template v-else>
                      <XIcon
                        fill="#ee3d3c"
                        :width="20"
                        :height="20"
                        v-if="!book.free_watch"
                      />
                      <CheckIcon
                        fill="#009e03"
                        :width="20"
                        :height="20"
                        v-else
                      />
                    </template>
                  </div>
                  <div>{{ book.title }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from "./../../../components/CloseIcon.vue";
import FullScreenIcon from "./../../../components/FullScreenIcon";
import ListIcon from "./../../../components/ListIcon.vue";
import CheckIcon from "./../../../components/CheckIcon.vue";
import XIcon from "./../../../components/XIcon.vue";
import { mapActions, mapState } from "vuex";
import pdf from "vue-pdf";
import CartIcon from "./../../MyCourse/components/CartIcon";
import Loading from "./../../../components/Loading";
export default {
  name: "ReadingBook",
  components: {
    CartIcon,
    CloseIcon,
    ListIcon,
    CheckIcon,
    XIcon,
    pdf,
    Loading,
    FullScreenIcon,
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      numPages: undefined,
      loading: false,
      showList: false,
      pdfFile: "",
      currentPage: 0,
      pageCount: 0,
      watchedPdfFile: null,
    };
  },
  props: {
    size: {
      type: String,
      default: () => {
        return "2/5";
      },
    },
    books: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    ...mapState("course", ["LessonTitle"]),
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    ...mapActions("course", ["setLessonTitle"]),
    ...mapActions("cart", ["addCart"]),

    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    openFullscreen() {
      var elem = document.getElementById("fullScreen");
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    },
    readingCourse(book, is_buy) {
      this.loading = true;
      if (!is_buy && !book.free_watch) {
        return false;
      }
      this.setLessonTitle(book.title);
      this.watchedPdfFile = book.pdf_url;

      this.pdfFile = pdf.createLoadingTask(book.pdf_url);
      this.pdfFile.promise.then((pdf) => {
        this.numPages = pdf.numPages;
        this.loading = false;
      });
      this.showList = false;
    },
    closeReading() {
      this.$emit("closeReading");
    },
    showListData() {
      this.showList = !this.showList;
      if (!this.showList) {
        this.loading = true;

        this.pdfFile = pdf.createLoadingTask(this.watchedPdfFile);
        this.pdfFile.promise.then((pdf) => {
          this.numPages = pdf.numPages;
          this.loading = false;
        });
      }
    },
    closeMessage($event) {
      this.$emit("closeMessage", $event);
    },

    showCart($event) {
      this.$emit("showCart", $event);
    },
    buy(book_id) {
      this.addCart(book_id).then(() => {
        this.$emit("buyingRead", book_id);
      });
    },
    log() {
      console.log(this.title);
    },
  },
  beforeDestroy() {},

  created() {
    this.loading = true;
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    let pdfFile;
    if (this.books.is_buy === 1) {
      pdfFile = this.books.list
        .filter((item) => item)
        .map((item) => item.pdf_url)[0];
      this.title = this.books.list
        .filter((item) => item)
        .map((item) => item.title)[0];
    } else {
      pdfFile = this.books.list
        .filter((item) => item.free_watch === 1)
        .map((item) => item.pdf_url)[0];
      this.title = this.books.list
        .filter((item) => item.free_watch === 1)
        .map((item) => item.title)[0];
    }

    if (pdfFile === undefined) {
      this.loading = false;
      return false;
    }
    this.watchedPdfFile = pdfFile;

    this.pdfFile = pdf.createLoadingTask(pdfFile);
    this.pdfFile.promise.then((pdf) => {
      this.numPages = pdf.numPages;
      this.loading = false;
    });
  },
  destroy() {},
};
</script>