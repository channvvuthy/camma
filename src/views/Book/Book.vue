<template>
  <div class="px-5 pt-5 font-khmer_os text-sm">
    <div class="flex w-full">
      <div class="flex py-2 w-full mb-5 px-5 items-center bg-gray-100 rounded-lg">
        <div class="font-black text-xl w-5/12">
          សៀវភៅ
        </div>
        <div class="flex items-center bg-white w-full px-5 rounded-md">
          <div class="mr-3">
            <SearchIcon :size="22" />
          </div>
          <input type="text" class="h-10 rounded w-full outline-none bg-transparent" placeholder="ស្វែងរក..."
            v-model="payload.s" v-on:keyup.enter="filterBook" />
          <FilterInput :title="department" @filterInput="departmentFilter()" />
          <div class="w-10"></div>
          <FilterInput :title="subject" @filterInput="subjectFilter()" />
        </div>
      </div>
    </div>
    <div class="h-screen pb-36">
      <div class="font-khmer_os pt-2 overflow-y-scroll h-full" @scroll="onScroll" id="feed">
        <div class="grid grid-cols-3 gap-4">
          <div v-for="(ebook, key) in ebookCourses" :key="key" class="bg-white rounded-lg shadow p-4">
            <div class="cursor-pointer flex">
              <img :src="ebook.thumbnail" @click="openView(ebook)" class="cursor-pointer w-20" />
              <div class="ml-5" @click="openView(ebook)">
                <div class="text-base">{{ cutString(ebook.title, 60) }}</div>
                <div class="text-sm mt-2 text-gray-400">រៀបរៀងដោយ៖ {{ ebook.teacher.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="ebookCourses.length == 0" class="text-custom text-base flex items-center justify-center h-full">
          មិនមានទិន្ន័យ
        </div>
      </div>
    </div>
    <ViewBook v-if="showView" :view="bookView" @closeView="closeView" @read="read($event)" :loading="loading"
      :cartId="cartId" @buyingRead="buyingRead($event)" />
    <ReadingBook v-if="showReading" :books="bookReading" @closeReading="closeReading"
      @buyingRead="buyingRead($event)" />
    <Cart v-if="showingCart" @closeCart="closeCart" />
    <GradeModal :moalTitle="department" v-if="isDepartmentFilter" @closeModal="departmentFilter()"
      @gradeSelected="gradeSelected($event)" />
    <SubjectModal :moalTitle="subject" v-if="isSubjectFilter" @subjectSelected="subjectSelected($event)"
      @closeModal="subjectFilter()" />
    <LoadingOverlay v-if="loading" />
  </div>
</template>

<script>
import ViewBook from "./components/View";
import ReadingBook from "./components/Read";
import { mapState, mapActions } from "vuex";
import Cart from "./../MyCourse/components/Cart";
import helper from "./../../helper/helper";
import FilterInput from "./components/FilterInput.vue";
import GradeModal from "./components/GradeModal.vue";
import SubjectModal from "./components/SubjectModal.vue";
import LoadingOverlay from "../Modal/LoadingOverlay.vue";
import SearchIcon from "../../components/SearchIcon.vue";

export default {
  components: {
    ViewBook,
    ReadingBook,
    Cart,
    FilterInput,
    GradeModal,
    SubjectModal,
    LoadingOverlay,
    SearchIcon
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      isDepartmentFilter: false,
      isSubjectFilter: false,
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
      department: "នាយកដ្ឋាន",
      subject: "រើសប្រភេទ",
      payload: {
        subject_id: "",
        grade_id: "",
        p: 1,
        s: "",
      },
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
      "getFilter",
    ]),
    ...mapActions("cart", ["addCart", "cartAlert"]),
    getEbookFilter() {
      this.loading = true
      this.getCourseEbook(this.payload).then(() => {
        this.loading = false
      })
    },
    gradeSelected(department) {
      this.$store.commit("course/getFilterByGradeID", department._id);
      this.payload.p = 1;
      this.departmentFilter();
      this.department = department.name || "នាយកដ្ឋាន";
      this.payload.grade_id = department._id || "";
      this.getEbookFilter();
    },
    subjectSelected(subject) {
      this.payload.p = 1;
      this.subjectFilter();
      this.subject = subject.name || "រើសប្រភេទ";
      this.payload.subject_id = subject._id || "";

      this.getEbookFilter();
    },
    departmentFilter() {
      this.isDepartmentFilter = !this.isDepartmentFilter;
    },
    subjectFilter() {
      this.isSubjectFilter = !this.isSubjectFilter;
    },
    cutString(string, limit) {
      return helper.cutString(string, limit);
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    closeReading() {
      this.showReading = false;
    },

    filterBook() {
      this.getCourseEbook(this.payload);
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
        this.payload.p++;
        if (!this.noResult) {
          this.getCourseEbookPagination(this.payload).then((response) => {
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
      this.getCourseEbook(this.payload);
    });
    this.getFilter();
  },

  watch: {
    query: function () {
      this.getCourseEbook({
        page: this.page,
        member_id: this.member_id,
      });
    },
    gradeID: function () {
      this.getCourseEbook(this.payload);
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