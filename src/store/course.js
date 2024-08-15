/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import config from "./../config";
import err from "./../helper/err";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    loadingVideo: false,
    paginationLoading: false,
    loadingCourse: false,
    loadingCourseDetail: false,
    courseDetail: [],
    courses: [],
    myCourses: [],
    loadingVideoCourse: false,
    loadingVideoCoursePagination: false,
    loadingEbook: false,
    loadingEbookCourse: false,
    loadingEbookCoursePagination: false,
    loadReading: false,
    listBook: [],
    ebookCourses: [],
    bookNav: [],
    LessonTitle: "",
    videoCourses: [],
    gradeID: "",
    selectedSubjectId: "",
    s: "",
    gettingCourseScroll: false,
    teacher: {},
    downloadDetails: [],
    videoActive: {},
    subject: {},
    numberOfView: 0,
    subjectFilterTitle: "ជ្រើសរើសកម្មវិធីសិក្សា"
  },

  mutations: {

    setSubjectFilterTitle(state, value) {
      state.subjectFilterTitle = value;
    },
    /**
     * Set the number of views for the video.
     *
     * @param {Object} state - The Vuex state object
     * @param {number} value - The new number of views
     */
    setNumberOfView(state, value) {
      state.numberOfView = value;
    },

    toggleMyFavorite(state, { _id, is_favorite }) {
      const newFavoriteState = (is_favorite == undefined || is_favorite == 0) ? 1 : 0;

      state.courseDetail.list.forEach(item => {
        if (item._id == _id) {
          item.is_favorite = newFavoriteState;
        }
      });
    },
    getFilter(state, payload) {
      state.subject = payload.subject;
      state.courses.grade = payload.department;
    },
    setSubjectId(state, payload) {
      state.selectedSubjectId = payload;
    },
    getVideo(state, payload) {
      state.videoActive = payload;
    },
    getDownloadDetail(state, downloadDetails) {
      downloadDetails.sort((a, b) => (a.order > b.order ? 1 : -1));
      state.downloadDetails = downloadDetails;
    },
    getTeacherInfo(state, teacher) {
      state.teacher = teacher;
    },

    getLoadingCourseByScroll(state, status) {
      state.gettingCourseScroll = status;
    },
    gettingCourseByScroll(state, courseDetail) {
      if (courseDetail?.list?.length) {
        state.courseDetail.list.push(...courseDetail.list);
      }
    },

    gettingEbook(state, status) {
      state.loadingEbook = status;
    },

    getBook(state, bookNav) {
      state.bookNav = bookNav;
    },

    gettingVideoCoursePagination(state, status) {
      state.loadingVideoCoursePagination = status;
    },

    videoCourseListPagination(state, videoCourses) {
      for (let index = 0; index < videoCourses.length; index++) {
        state.videoCourses.push(videoCourses[index]);
      }
    },
    afterAddToCart(state, course_id) {
      state.videoCourses.forEach(item => {
        if (item._id == course_id) {
          item.is_in_cart = !item.is_in_cart;
        }
      });
    },

    videoCourseList(state, videoCourses) {
      state.videoCourses = videoCourses;
    },
    gettingVideoCourse(state, status) {
      state.loadingVideoCourse = status;
    },
    loadingVideo(state, status) {
      state.loadingVideo = status;
    },

    loadingMyCourse(state, status) {
      state.loadingCourse = status;
    },

    getVideoList(state, videos) {
      state.courses = videos;
    },
    removeActiveFavorite(state, lesson_id) {
      state.courses.lesson.forEach((item) => {
        if (item.video._id == lesson_id) {
          item.video.is_favorite = 0;
        }
      });
    },

    addFavorite(state, lesson_id) {
      state.courses.lesson.forEach((item) => {
        if (item.video._id == lesson_id) {
          item.video.is_favorite = 1;
        }
      });
    },

    getMyCourse(state, courses) {
      state.myCourses = courses;
    },

    getLoadingCourseDetail(state, status) {
      state.loadingCourseDetail = status;
    },

    gettingCourseDetail(state, courseList) {
      state.courseDetail = courseList;
    },

    pagesLoading(state, status) {
      state.paginationLoading = status;
    },

    getFilterByGradeID(state, gradeID) {
      state.gradeID = gradeID;
    },
    getQueryString(state, s) {
      state.s = s;
    },
    loadMoreVideoLesson(state, lesson) {
      for (let i = 0; i < lesson.length; i++) {
        state.courses.lesson.push(lesson[i]);
      }
    },

    gettingCourseEbook(state, status) {
      state.loadingEbookCourse = status;
    },

    courseEbook(state, ebookCourses) {
      state.ebookCourses = ebookCourses;
    },
    gettingCourseEbookPagination(state, status) {
      state.loadingEbookCoursePagination = status;
    },
    courseEbookPagination(state, ebookCourses) {
      for (let index = 0; index < ebookCourses.length; index++) {
        state.ebookCourses.push(ebookCourses[index]);
      }
    },
    getReadingBook(state, status) {
      state.loadReading = status;
    },

    readingBook(state, books) {
      state.books = books;
    },
    setLessonTitle(state, LessonTitle) {
      state.LessonTitle = LessonTitle;
    },
  },

  actions: {
    async videoList({ commit, dispatch }) {
      commit("loadingVideo", true);

      const { gradeID, selectedSubjectId, s } = this.state.course;
      const url = `${config.apiUrl}home?grade_id=${gradeID}&subject_id=${selectedSubjectId}&s=${s}`;

      try {
        const res = await axios
          .get(url);
        commit("loadingVideo", false);
        dispatch("getVideo", res.data.data);

        if (res.data.status === 2) {
          err.err(res.data.msg);
        }
      } catch (err) {
        commit("loadingVideo", false);
        return await Promise.reject(err);
      }
    },

    async videoPagination({ commit, dispatch }, page = 1) {
      commit("pagesLoading", true);

      const { gradeID, selectedSubjectId, s } = this.state.course;
      const url = `${config.apiUrl}home?p=${page}&grade_id=${gradeID}&subject_id=${selectedSubjectId}&s=${s}`;

      try {
        const res = await axios
          .get(url);
        commit("pagesLoading", false);

        if (res.data.status === 2) {
          err.err(res.data.msg);
        }

        const { lesson } = res.data.data;
        dispatch("loadMoreVideo", lesson);
        return lesson;
      } catch (err) {
        commit("pagesLoading", false);
        return await Promise.reject(err);
      }
    },
    loadMoreVideo({ commit }, lesson) {
      commit("loadMoreVideoLesson", lesson);
    },

    myCourseList({ commit, dispatch }, type) {
      commit("loadingMyCourse", true);
      axios
        .get(
          config.apiUrl +
          "user/my-course?type=" +
          type +
          "&s=" +
          this.state.course.s +
          "&grade_id=" +
          this.state.course.gradeID
        )
        .then((res) => {
          commit("loadingMyCourse", false);

          if (res.data.status && res.data.status === 2) {
            err.err(res.data.msg);
          }

          dispatch("getMyCourse", res.data.data);
        })
        .catch(() => {
          commit("loadingMyCourse", false);
        });
    },

    getVideo({ commit }, videos) {
      commit("getVideoList", videos);
    },

    getCourseDetail({ commit, dispatch }, params) {
      commit("getLoadingCourseDetail", true);
      return new Promise((resolve, reject) => {
        axios
          .get(
            config.apiUrl +
            "lesson/video/?course_id=" +
            params.courseId +
            "&type=" +
            params.type +
            "&order=" +
            params.order
          )
          .then((res) => {
            commit("getLoadingCourseDetail", false);

            if (res.data.status && res.data.status === 2) {
              err.err(res.data.msg);
            }

            dispatch("gettingCourseDetail", res.data.data);
            resolve();
          })
          .catch(() => {
            commit("getLoadingCourseDetail", false);
            reject();
          });
      });
    },
    getCourseByScroll({ commit }, params) {
      commit("getLoadingCourseByScroll", true);
      return new Promise((resolve, reject) => {
        axios
          .get(
            config.apiUrl +
            "lesson/video/?course_id=" +
            params.courseId +
            "&order=" +
            params.order
          )
          .then((res) => {
            commit("getLoadingCourseByScroll", false);
            commit("gettingCourseByScroll", res.data.data);

            if (res.data.status && res.data.status === 2) {
              err.err(res.data.msg);
            }

            resolve();
          })
          .catch(() => {
            commit("getLoadingCourseByScroll", false);
            reject();
          });
      });
    },

    lessonView({ dispatch }, video_id) {
      return new Promise((resolve, reject) => {
        axios
          .get(config.apiUrl + "lesson/video/view?video_id=" + video_id)
          .then((res) => {
            if (res.data.status && res.data.status === 2) {
              err.err(res.data.msg);
            }
            resolve(res.data.data.pdf);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getMyCourse({ commit }, course) {
      commit("getMyCourse", course);
    },

    gettingCourseDetail({ commit }, courseList) {
      commit("gettingCourseDetail", courseList);
    },

    filterByGradeID({ commit }, id) {
      commit("getFilterByGradeID", id);
    },
    filterByQueryString({ commit }, s) {
      commit("getQueryString", s);
    },

    getVideoCourse({ commit }) {
      commit("gettingVideoCourse", true);

      const { s, gradeID, selectedSubjectId } = this.state.course;
      const url = `${config.apiUrl}course/video?s=${s}&grade_id=${gradeID}&subject_id=${selectedSubjectId}&type=1`;

      return axios
        .get(url)
        .then((res) => {
          if (res.data.status === 2) {
            err.err(res.data.msg);
          }

          commit("gettingVideoCourse", false);
          commit("videoCourseList", res.data.data);
          return res.data.data;
        })
        .catch((err) => {
          commit("gettingVideoCourse", false);
          throw err;
        });
    },

    async videoCoursePagination({ commit }, page = 1) {
      commit("gettingVideoCoursePagination", true);

      const { s, gradeID, selectedSubjectId } = this.state.course;
      const url = `${config.apiUrl}course/video?s=${s}&grade_id=${gradeID}&subject_id=${selectedSubjectId}&p=${page}&type=1`;

      try {
        const res = await axios
          .get(url);
        if (res.data.status === 2) {
          err.err(res.data.msg);
        }

        commit("gettingVideoCoursePagination", false);
        commit("videoCourseListPagination", res.data.data);
        return res.data.data;
      } catch (err) {
        commit("gettingVideoCoursePagination", false);
        throw err;
      }
    },

    getEbook({ commit }, payload) {
      commit("gettingEbook", true);
      const { grade_id="", subject_id="",p=1 } = payload;
    
      return new Promise((resolve, reject) => {
        const storedBook = localStorage.getItem("book");
    
        if (storedBook) {
          const parsedBook = JSON.parse(storedBook);
          commit("gettingEbook", false);
          commit("getBook", parsedBook);
          resolve(parsedBook);
        } else {
          axios
            .get(
              `${config.apiUrl}course/e-book?s=${this.state.course.s}&grade_id=${grade_id}&p=${p}&subject_id=${subject_id}&type=2`
            )
            .then((res) => {
              if (res.data.status === 2) {
                err.err(res.data.msg);
              }
    
              const bookData = res.data.data;
              commit("gettingEbook", false);
              commit("getBook", bookData);
              localStorage.setItem("books", JSON.stringify(bookData));
              resolve(bookData);
            })
            .catch((err) => {
              commit("gettingEbook", false);
              reject(err);
            });
        }
      });
    },    
    afterAddToCart({ commit }, course_id) {
      commit("afterAddToCart", course_id);
    },
    getCourseEbook({ commit }, payload) {
      commit("gettingCourseEbook", true);
      const { grade_id="", subject_id="",p=1, s="" } = payload;
    
      const url = `${config.apiUrl}course/e-book?s=${s}&grade_id=${grade_id}&p=${p}&subject_id=${subject_id}&type=2`;
    
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((res) => {
            if (res.data.status === 2) {
              err.err(res.data.msg);
            }
    
            commit("gettingCourseEbook", false);
            commit("courseEbook", res.data.data);
            resolve(res.data.data);
          })
          .catch((error) => {
            commit("gettingCourseEbook", false);
            reject(error);
          });
      });
    },    

    getCourseEbookPagination({ commit }, payload) {
      commit("gettingCourseEbookPagination", true);
      const { grade_id="", subject_id="",p=1, s="" } = payload;

      const url = `${config.apiUrl}course/e-book?s=${s}&grade_id=${grade_id}&p=${p}&subject_id=${subject_id}&type=2`;
    
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((res) => {
            if (res.data.status === 2) {
              err.err(res.data.msg);
            }
    
            commit("gettingCourseEbookPagination", false);
            commit("courseEbookPagination", res.data.data);
            resolve(res.data.data);
          })
          .catch((error) => {
            commit("gettingCourseEbookPagination", false);
            reject(error);
          });
      });
    },    
    readBook({ commit }, params) {
      commit("getReadingBook", true);
      return new Promise((resolve, reject) => {
        axios
          .get(
            config.apiUrl +
            "lesson/e-book?course_id=" +
            params.course_id +
            "&order=" +
            params.order
          )
          .then((res) => {
            if (res.data.status && res.data.status === 2) {
              err.err(res.data.msg);
            }

            commit("getReadingBook", false);
            commit("readingBook", res.data.data);
            resolve(res.data.data);
          })
          .catch((err) => {
            commit("getReadingBook", false);
            reject(err);
          });
      });
    },
    setLessonTitle({ commit }, LessonTitle) {
      commit("setLessonTitle", LessonTitle);
    },
    removeActiveFavorite({ commit }, lesson_id) {
      commit("removeActiveFavorite", lesson_id);
    },
    getvideoPlay({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(config.apiUrl + `lesson/video?course_id=${payload}`)
          .then((res) => {
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    getFilter({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(config.apiUrl + "/filter")
          .then((res) => {
            commit("getFilter", res.data.data);
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
