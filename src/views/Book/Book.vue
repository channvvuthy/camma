<template>
  <div class="px-5 pt-5">
    <div class="flex font-khmer_os text-14px mb-4" v-if="!loadingEbook">
      <div
        class="
          cursor-pointer
          bg-gray-200
          rounded-full
          px-2
          py-1
          mr-3
          border border-gray-300
          hover:bg-gray-300
        "
        :class="member_id === '' ? 'bg-gray-300' : ''"
        @click="filterBook('')"
      >
        សៀវភៅ
      </div>
      <div
        class="
          cursor-pointer
          bg-gray-200
          rounded-full
          px-2
          py-1
          mr-3
          border border-gray-300
          hover:bg-gray-300
        "
        :class="member_id === book._id ? 'bg-gray-300' : ''"
        v-for="(book, key) in bookNav"
        :key="key"
        @click="filterBook(book._id)"
      >
        {{ book.title }}
      </div>
    </div>
    <div
      v-if="loadingEbookCourse"
      class="flex justify-center items-center h-screen relative -top-5"
    >
      <h1 class="text-sm font-semibold font-khmer_os relative -top-28">
        <loading></loading>
      </h1>
    </div>

    <div class="h-screen pb-36" v-else>
      <div
        class="h-screen flex justify-center items-center"
        v-if="ebookCourses.length <= 0"
      >
        <img src="/icon/Empty/Empty.svg" class="w-64 mb-5 relative -top-28" />
      </div>
      <div
        class="
          grid grid-cols-4
          gap-4
          font-khmer_os
          pt-2
          overflow-y-scroll
          h-full
        "
        @scroll="onScroll"
        id="feed"
      >
        <div v-for="(ebook, key) in ebookCourses" :key="key">
          <div
            class="cursor-pointer relative"
            :class="key === ebookCourses.length - 1 ? 'pb-16' : ''"
          >
            <div class="absolute right-0 top-0" v-if="ebook.is_new">
              <img
                src="/icon/New/New.png"
                class="w-10"
                style="margin-top: -8px; margin-right: -8px"
              />
            </div>
            <img
              :src="ebook.thumbnail"
              @click="openView(ebook)"
              class="cursor-pointer"
            />
            <div
              class="flex justify-between items-center mt-4 w-full px-2"
              v-if="member_id === ''"
            >
              <div class="text-14px" @click="openView(ebook)">
                {{ cutString(ebook.des,50) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ViewBook
      v-if="showView"
      :view="bookView"
      @closeView="closeView"
      @read="read($event)"
      :loading="loading"
      :cartId="cartId"
      @buyingRead="buyingRead($event)"
    />
    <ReadingBook
      v-if="showReading"
      :books="bookReading"
      @closeReading="closeReading"
      @buyingRead="buyingRead($event)"
    />
    <Cart v-if="showingCart" @closeCart="closeCart" />
  </div>
</template>

<script>
import ViewBook from "./components/View";
import ReadingBook from "./components/Read";
import { mapState, mapActions } from "vuex";
import Cart from "./../MyCourse/components/Cart";
import Loading from "./../../components/Loading";
import helper from "./../../helper/helper"
export default {
  name: "Book",
  components: {
    ViewBook,
    ReadingBook,
    Cart,
    Loading,
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      showView: false,
      showReading: false,
      showingCart: false,
      bookView: "",
      page: 1,
      member_id: "",
      loading: false,
      bookReading: "",
      title: "",
      cartId: "",
      noResult: false,
    };
  },
  computed: {
    ...mapState("course", [
      "loadingEbook",
      "bookNav",
      "loadingEbookCourse",
      "ebookCourses",
    ]),
    ...mapState("cart", ["cartAdded"]),
    query: {
      get() {
        return this.$store.state.course.s;
      },
      set(newQuery) {
        return newQuery;
      },
    },
    gradeID: {
      get() {
        return this.$store.state.course.gradeID;
      },
      set(gradeID) {
        return gradeID;
      },
    },
  },

  methods: {
    ...mapActions("course", [
      "getEbook",
      "getCourseEbook",
      "getCourseEbookPagination",
      "readBook",
      "setLessonTitle",
    ]),
    ...mapActions("cart", ["addCart", "cartAlert"]),
    cutString(string, limit){
        return helper.cutString(string,limit)
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    closeReading() {
      this.showReading = false;
    },

    filterBook(member_id) {
      this.page = 1;
      this.member_id = member_id;
      this.getCourseEbook({
        page: this.page,
        member_id,
      });
    },

    addToCart(course_id) {
      this.cartId = course_id;
      this.addCart(course_id).then(() => {
        this.cartAlert(course_id);
      });
    },
    inCart(course_id) {
      if (this.cartAdded && this.cartAdded.length) {
        for (let index = 0; index < this.cartAdded.length; index++) {
          if (this.cartAdded[index] === course_id) {
            return true;
          }
        }
      }
      return false;
    },

    read($event) {
      this.title = $event.title;
      this.setLessonTitle(this.title);
      this.loading = true;
      this.readBook({ course_id: $event.id, order: "" }).then((response) => {
        this.bookReading = response;

        this.loading = false;
        this.showView = false;
        this.showReading = true;
      });
    },
    buyingRead() {
      this.showView = false;
      this.showingCart = true;
      this.showReading = false;
    },
    closeCart() {
      this.showingCart = false;
    },
    closeView() {
      this.showView = false;
    },
    openView(ebook) {
      this.bookView = ebook;
      this.showView = true;
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.page++;
        if (!this.noResult) {
          this.getCourseEbookPagination({
            page: this.page,
            member_id: this.member_id,
          }).then((response) => {
            if (response.length <= 0) {
              this.noResult = true;
            }
          });
        }
      }
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    this.getEbook(this.page).then(() => {
      this.getCourseEbook({
        page: this.page,
        member_id: "",
      });
    });
  },

  watch: {
    query: function () {
      this.getCourseEbook({
        page: this.page,
        member_id: this.member_id,
      });
    },
    gradeID: function () {
      this.getCourseEbook({
        page: this.page,
        member_id: this.member_id,
      });
    },
  },
};
</script>

<style>
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