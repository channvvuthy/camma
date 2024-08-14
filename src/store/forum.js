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
        isDeleting: false,

    },
    mutations: {
        setIsDeleting(state, value){
            state.isDeleting = value;
        },
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
        gettingCommentPagination(state, comments) {
            if (Array.isArray(comments) && comments.length) {
                state.comments.push(...comments);
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
        },
        updateForum(state, value) {
            state.forums = state.forums.map(element => 
                element._id === value._id ? value : element
            );
        },

        updateComment(state, value){
            state.comments = state.comments.map(element => 
                element._id == value._id ? value : element
            );
        }
    },
    actions: {
        async getForum({ commit }, { s, p, lesson_id }) {
            commit("loadingForum", true);
        
            try {
                const { data } = await axios.get(`${config.apiUrl}forum`, {
                    params: { s, p, lesson_id }
                });
        
                if (data.status === 2) {
                    err.err(data.msg);
                }
        
                commit("loadingForum", false);
                commit("gettingForum", data.data);
        
                return data;
            } catch (error) {
                commit("loadingForum", false);
                throw error;
            }
        },        
        async addForum({ commit }, data) {
            commit("addingForum", true);
        
            try {
                const { data: responseData } = await axios.post(`${config.apiUrl}forum/add`, data);
        
                if (responseData.status === 2) {
                    err.err(responseData.msg);
                }
        
                commit("addingForum", false);
                commit("addForm", responseData.data);
        
                return responseData.data;
            } catch (error) {
                commit("addingForum", false);
                throw error;
            }
        },        
        async getForumPagination({ commit }, { s, p, lesson_id }) {
            commit("loadingForumPagination", true);
        
            try {
                const { data } = await axios.get(`${config.apiUrl}forum`, {
                    params: { s, p, lesson_id }
                });
        
                if (data.status === 2) {
                    err.err(data.msg);
                }
        
                commit("loadingForumPagination", false);
                commit("gettingForumPagination", data.data);
        
                return data;
            } catch (error) {
                commit("loadingForumPagination", false);
                throw error;
            }
        },

        async showComment({ commit }, { forum_id, p }) {
            commit("showingComment", true);
        
            try {
                const { data } = await axios.get(`${config.apiUrl}forum/comment`, {
                    params: { forum_id, p }
                });
        
                if (data.status === 2) {
                    err.err(data.msg);
                }
        
                commit("showingComment", false);
                commit("gettingComment", data.data.comment);
        
                return data.data;
            } catch (error) {
                commit("showingComment", false);
                throw error;
            }
        },
        async deleteComment({ commit }, comment_id) {
            commit("setIsDeleting", true);
            try {
                const { data } = await axios.post(`${config.apiUrl}forum/comment/remove`, { comment_id });

                commit("setIsDeleting", false);

                return data.data;
            } catch (error) {
                commit("setIsDeleting", false);
                throw error;
            }
        },

        async deleteForum({ commit }, forum_id) {
            commit("setIsDeleting", true);
            try {
                const { data } = await axios.post(`${config.apiUrl}forum/remove`, { forum_id });

                commit("setIsDeleting", false);
                
                return data.data;
            } catch (error) {
                commit("setIsDeleting", false);
                throw error;
            }
        },
        async showCommentPagination({ commit }, params) {
            commit("showCommentPagination", true);
        
            const { forum_id, p } = params;
            const url = `${config.apiUrl}forum/comment?forum_id=${forum_id}&p=${p}`;
        
            try {
                const response = await axios.get(url)
                const { status, msg, data } = response.data

                if (status === 2) {
                    err.err(msg)
                }

                commit("showCommentPagination", false)
                commit("gettingCommentPagination", data.comment)
                return data
            } catch (error) {
                commit("showCommentPagination", false)
                return await Promise.reject(error)
            }
        },

        async addComment({ commit }, params) {
            commit("addingComment", true);
        
            try {
                const response = await axios.post(`${config.apiUrl}forum/comment/add`, params)
                const { status, msg, data } = response.data

                if (status === 2) {
                    err.err(msg)
                }

                commit("addingComment", false)
                commit("gettingCommentReply", data)
                return data
            } catch (error) {
                commit("addingComment", false)
                return await Promise.reject(error)
            }
        },

        async updateForum({ commit }, params) {
            try {
                const response = await axios.post(`${config.apiUrl}forum/update`, params)
                const { status, msg, data } = response.data

                if (status === 2) {
                    err.err(msg)
                }

                commit("updateForum", data);

                return data
            } catch (error) {
                return await Promise.reject(error)
            }
        },

        async updateComment({ commit }, params) {
            try {
                const response = await axios.post(`${config.apiUrl}forum/comment/update `, params)
                const { status, msg, data } = response.data

                if (status === 2) {
                    err.err(msg)
                }

                commit("updateComment", data);

                return data
            } catch (error) {
                return await Promise.reject(error)
            }
        }
        
    }
}