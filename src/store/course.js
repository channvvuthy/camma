import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from "./../config"
import err from "./../helper/err"

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
        gradeID: '',
        s: '',
        gettingCourseScroll: false,
        teacher: {},
        downloadDetails: []

    },

    mutations: {

        getDownloadDetail(state, downloadDetails){
            downloadDetails.sort((a, b) => (a.order > b.order) ? 1 : -1)
            state.downloadDetails = downloadDetails
        },
        getTeacherInfo(state, teacher){
            state.teacher = teacher
        },

        getLoadingCourseByScroll(state, status){
            state.gettingCourseScroll = status
        },
        gettingCourseByScroll(state, courseDetail){
            if (courseDetail && courseDetail.list.length) {
                for (let i = 0; i < courseDetail.list.length; i++) {
                    state.courseDetail.list.push(courseDetail.list[i])
                }
            }
        },

        gettingEbook(state, status){
            state.loadingEbook = status
        },

        getBook(state, bookNav){
            state.bookNav = bookNav
        },

        gettingVideoCoursePagination(state, status){
            state.loadingVideoCoursePagination = status
        },

        videoCourseListPagination(state, videoCourses){
            for (let index = 0; index < videoCourses.length; index++) {
                state.videoCourses.push(videoCourses[index])
            }
        },
        afterAddToCart(state, course_id){
            state.videoCourses = state.videoCourses.filter(item => {
                if (item._id === course_id) {
                    item.is_in_cart = !item.is_in_cart
                }
                return item
            })
        },

        videoCourseList(state, videoCourses){
            state.videoCourses = videoCourses
        },
        gettingVideoCourse(state, status){
            state.loadingVideoCourse = status
        },
        loadingVideo(state, status){
            state.loadingVideo = status
        },

        loadingMyCourse(state, status){
            state.loadingCourse = status
        },

        getVideoList(state, videos){
            state.courses = videos
        },
        removeActiveFavorite(state, lesson_id){
            state.courses.lesson = state.courses.lesson.filter(item => {
                if (item.video._id === lesson_id) {
                    item.video.is_favorite = 0
                }
                return item
            })
        },

        getMyCourse(state, courses){
            state.myCourses = courses
        },

        getLoadingCourseDetail(state, status){
            state.loadingCourseDetail = status
        },

        gettingCourseDetail(state, courseList){
            state.courseDetail = courseList
        },

        pagesLoading(state, status){
            state.paginationLoading = status
        },

        getFilterByGradeID(state, gradeID){
            state.gradeID = gradeID
        },
        getQueryString(state, s){
            state.s = s
        },
        loadMoreVideoLesson(state, lesson){
            for (let i = 0; i < lesson.length; i++) {
                state.courses.lesson.push(lesson[i])
            }
        },

        gettingCourseEbook(state, status){
            state.loadingEbookCourse = status
        },

        courseEbook(state, ebookCourses){
            state.ebookCourses = ebookCourses
        },
        gettingCourseEbookPagination(state, status){
            state.loadingEbookCoursePagination = status
        },
        courseEbookPagination(state, ebookCourses){
            for (let index = 0; index < ebookCourses.length; index++) {
                state.ebookCourses.push(ebookCourses[index])
            }
        },
        getReadingBook(state, status){
            state.loadReading = status
        },

        readingBook(state, books){
            state.books = books
        },
        setLessonTitle(state, LessonTitle){
            state.LessonTitle = LessonTitle
        }
    },

    actions: {
        videoList({commit, dispatch}){
            commit('loadingVideo', true);
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'home?grade_id=' + this.state.course.gradeID + "&s=" + this.state.course.s).then(response => {
                    commit('loadingVideo', false);
                    dispatch('getVideo', response.data.data)
                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }
                }).catch(err => {
                    commit('loadingVideo', false)
                    reject(err)
                })
            })
        },

        videoPagination({commit, dispatch}, page = 1){
            commit("pagesLoading", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'home?p=' + page + "&grade_id=" + this.state.course.gradeID + "&s=" + this.state.course.s).then(response => {
                    commit("pagesLoading", false)

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    resolve(response.data.data.lesson)

                    dispatch("loadMoreVideo", response.data.data.lesson)

                }).catch(err => {
                    commit("pagesLoading", false)
                    reject(err)
                })
            })
        },
        loadMoreVideo({commit}, lesson){
            commit("loadMoreVideoLesson", lesson)
        },

        myCourseList({commit, dispatch}, type){
            commit('loadingMyCourse', true);
            axios.get(config.apiUrl + 'user/my-course?type=' + type + "&s=" + this.state.course.s + "&grade_id=" + this.state.course.gradeID).then(response => {
                commit('loadingMyCourse', false);

                if (response.data.status && response.data.status === 2) {
                    err.err(response.data.msg)
                }

                dispatch('getMyCourse', response.data.data)
            }).catch(() => {
                commit('loadingMyCourse', false)
            })
        },

        getVideo({commit}, videos){
            commit('getVideoList', videos)
        },

        getCourseDetail({commit, dispatch}, params){
            commit('getLoadingCourseDetail', true);
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'lesson/video/?course_id=' + params.courseId + "&type=" + params.type + "&order=" + params.order).then(response => {

                    commit('getLoadingCourseDetail', false);

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    dispatch("gettingCourseDetail", response.data.data)
                    resolve()

                }).catch(() => {
                    commit('getLoadingCourseDetail', false)
                    reject()
                })
            })
        },
        getCourseByScroll({commit}, params){
            commit('getLoadingCourseByScroll', true);
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'lesson/video/?course_id=' + params.courseId + '&order=' + params.order).then(response => {

                    commit('getLoadingCourseByScroll', false);
                    commit("gettingCourseByScroll", response.data.data)

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    resolve()

                }).catch(() => {
                    commit('getLoadingCourseByScroll', false)
                    reject()
                })
            })
        },

        lessonView({dispatch}, video_id){
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'lesson/video/view?video_id=' + video_id).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    dispatch("countView", response.data)
                    resolve(response.data.data.pdf)
                }).catch(err => {
                    reject(err)
                })
            })
        },

        countView(){

        },
        getMyCourse({commit}, course){
            commit('getMyCourse', course)
        },

        gettingCourseDetail({commit}, courseList){
            commit('gettingCourseDetail', courseList)
        },

        filterByGradeID({commit}, id){
            commit("getFilterByGradeID", id)
        },
        filterByQueryString({commit}, s){
            commit('getQueryString', s)
        },

        getVideoCourse({commit}){
            commit("gettingVideoCourse", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'course/video?s=' + this.state.course.s + "&grade_id=" + this.state.course.gradeID).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    commit("gettingVideoCourse", false)
                    commit("videoCourseList", response.data.data)
                    resolve(response.data.data)
                }).catch(err => {
                    commit("gettingVideoCourse", false)
                    reject(err)
                })
            })
        },

        videoCoursePagination({commit}, page = 1){
            commit("gettingVideoCoursePagination", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'course/video?s=' + this.state.course.s + "&grade_id=" + this.state.course.gradeID + "&p=" + page).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    commit("gettingVideoCoursePagination", false)
                    commit("videoCourseListPagination", response.data.data)
                    resolve(response.data.data)
                }).catch(err => {
                    commit("gettingVideoCoursePagination", false)
                    reject(err)
                })
            })
        },

        getEbook({commit}, page = 1){
            commit('gettingEbook', true)
            return new Promise((resolve, reject) => {
                if (localStorage.getItem('book')) {
                    commit('gettingEbook', false)
                    commit("getBook", JSON.parse(localStorage.getItem('book')))
                    resolve(JSON.parse(localStorage.getItem('book')))
                } else {
                    axios.get(config.apiUrl + "course/member?s=" + this.state.course.s + "&p=" + page).then(response => {

                        if (response.data.status && response.data.status === 2) {
                            err.err(response.data.msg)
                        }

                        commit('gettingEbook', false)
                        commit("getBook", response.data.data)
                        localStorage.setItem('books', JSON.stringify(response.data.data))
                        resolve(response.data.data)
                    }).catch(err => {
                        commit('gettingEbook', false)
                        reject(err)
                    })
                }
            })
        },
        afterAddToCart({commit}, course_id){
            commit("afterAddToCart", course_id)
        },
        getCourseEbook({commit}, params){
            commit("gettingCourseEbook", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'course/e-book?s=' + this.state.course.s + "&grade_id=" + this.state.course.gradeID + "&p=" + params.page + "&member_id=" + params.member_id)
                    .then(response => {

                        if (response.data.status && response.data.status === 2) {
                            err.err(response.data.msg)
                        }

                        commit("gettingCourseEbook", false)
                        commit('courseEbook', response.data.data)
                        resolve(response.data.data)
                    }).catch(err => {
                    commit("gettingCourseEbook", false)
                    reject(err)
                })
            })
        },

        getCourseEbookPagination({commit}, params){
            commit("gettingCourseEbookPagination", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'course/e-book?s=' + this.state.course.s + "&grade_id=" + this.state.course.gradeID + "&p=" + params.page + "&member_id=" + params.member_id)
                    .then(response => {

                        if (response.data.status && response.data.status === 2) {
                            err.err(response.data.msg)
                        }

                        commit("gettingCourseEbookPagination", false)
                        commit('courseEbookPagination', response.data.data)
                        resolve(response.data.data)
                    }).catch(err => {
                    commit("gettingCourseEbookPagination", false)
                    reject(err)
                })
            })
        },
        readBook({commit}, params){
            commit('getReadingBook', true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + "lesson/e-book?course_id=" + params.course_id + "&order=" + params.order).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    commit('getReadingBook', false)
                    commit("readingBook", response.data.data)
                    resolve(response.data.data)

                }).catch(err => {
                    commit('getReadingBook', false)
                    reject(err)
                })
            })
        },
        setLessonTitle({commit}, LessonTitle){
            commit('setLessonTitle', LessonTitle)
        },
        removeActiveFavorite({commit}, lesson_id){
            commit("removeActiveFavorite", lesson_id)
        }
    },

}