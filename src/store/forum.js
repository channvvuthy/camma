import axios from "axios"
import config from "./../config"
import err from "./../helper/err"
export default {
    namespaced: true,
    state: {
        forums: [],
        loadingForum: false,
        loadingForumPagination: false,
        loadingAdd: false,
        comments: [],
        loadingComment: false,
        addingComment: false,

    },
    mutations: {
        showCommentPagination(){

        },
        addingComment(state, status){
            state.addingComment = status
        },
        gettingCommentReply(state, comment){
            state.comments.push(comment)
        },
        gettingComment(state, comments){
            state.comments = comments
        },
        gettingCommentPagination(state, comment){
            if (comment && comment.length) {
                for (let index = 0; index < comment.length; index++) {
                    state.comments.push(comment[index])
                }
            }
        },
        showingComment(state, status){
            state.loadingComment = status
        },
        addForm(state, forum){
            state.forums.unshift(forum)
        },
        addingForum(state, status){
            state.loadingAdd = status
        },
        loadingForum(state, status){
            state.loadingForum = status
        },
        gettingForum(state, forums){
            state.forums = forums
        },
        loadingForumPagination(state, status){
            state.loadingForumPagination = status
        },
        gettingForumPagination(state, forums){
            for (let i = 0; i < forums.length; i++) {
                state.forums.push(forums[i])
            }
        }
    },
    actions: {
        getForum({commit}, params){
            commit("loadingForum", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'forum?s=' + params.s + "&p=" + params.p + "&lesson_id=" + params.lesson_id).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    commit("loadingForum", false)
                    commit("gettingForum", response.data.data)
                    resolve(response)
                }).catch(err => {
                    commit("loadingForum", false)
                    reject(err)
                })
            })
        },
        addForum({commit}, data){
            commit("addingForum", true)
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'forum/add', data).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    commit("addingForum", false)
                    commit("addForm", response.data.data)
                    resolve(response.data.data)
                }).catch(err => {
                    commit("addingForum", false)
                    reject(err)
                })
            })
        },
        getForumPagination({commit}, params){
            commit("loadingForumPagination", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'forum?s=' + params.s + "&p=" + params.p + "&lesson_id=" + params.lesson_id).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    commit("loadingForumPagination", false)
                    commit("gettingForumPagination", response.data.data)
                    resolve(response)
                }).catch(err => {
                    commit("loadingForumPagination", false)
                    reject(err)
                })
            })
        },
        async  showComment({ commit }, params) {
            commit("showingComment", true);
            try {
                const response = await axios.get(`${config.apiUrl}forum/comment`, {
                    params: {
                        forum_id: params.forum_id,
                        p: params.p
                    }
                });
        
                if (response.data.status === 2) {
                    err.err(response.data.msg);
                }
        
                commit("showingComment", false);
                commit("gettingComment", response.data.data.comment);
                return response.data.data;
            } catch (error) {
                commit("showingComment", false);
                throw error;
            }
        },
        
        showCommentPagination({commit}, params){
            commit("showCommentPagination", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + "forum/comment?forum_id=" + params.forum_id + "&p=" + params.p).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    commit("showCommentPagination", false)
                    commit("gettingCommentPagination", response.data.data.comment)
                    resolve(response.data.data)
                }).catch(err => {
                    commit("showCommentPagination", false)
                    reject(err)
                })
            })
        },
        addComment({commit}, params){
            commit("addingComment", true)
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'forum/comment/add', params).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    commit("addingComment", false)
                    commit("gettingCommentReply", response.data.data)
                    resolve(response.data.data)
                }).catch(err => {
                    commit("addingComment", false)
                    reject(err)
                })
            })
        }
    }
}