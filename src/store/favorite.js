import axios from "axios"
import config from "./../config"
import err from "./../helper/err"
export default {
    namespaced: true,

    state: {
        loading: false,
        favorites: [],
        paginationLoading: false,
    },

    mutations: {
        loading(state, status){
            state.loading = status
        },

        getAddedFavorite(state, favorite){
            state.favorites = favorite
        },

        removeFav(state, lesson_id){
            state.favorites = state.favorites.filter(favorite => favorite._id !== lesson_id)
        },

        pagesLoading(state, status){
            state.paginationLoading = status
        },
        loadMoreFavorite(state, favorites){
            if (favorites.length) {
                for (let i = 0; i < favorites.length; i++) {
                    state.favorites.push(favorites[i])
                }
            }

        }
    },

    actions: {
        add({commit}, params){
            commit("loading", true)
            axios.post(config.apiUrl + 'favorite/add', {lesson_id: params}).then(() => {


                commit("loading", false)
            }).catch(() => {
                commit("loading", false);
            })
        },

        getFavorite({commit}){
            commit("loading", true)
            axios.get(config.apiUrl + 'favorite').then(response => {

                if (response.data.status && response.data.status === 2) {
                    err.err(response.data.msg)
                }


                commit("loading", false)
                commit("getAddedFavorite", response.data.data)
            }).catch(() => {
                commit("loading", false)
            })
        },

        favoritePagination({commit, dispatch}, page = 1){
            commit("pagesLoading", true)
            return new Promise((resolve, reject) =>{
                axios.get(config.apiUrl + 'favorite?p=' + page).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    resolve(response.data.data)
    
                    commit("pagesLoading", false)
                    dispatch("loadMoreFavorite", response.data.data)
                }).catch(err => {
                    commit("pagesLoading", false)
                    reject(err)
                })
            })
            
        },
        loadMoreFavorite({commit}, favorite){
            commit("loadMoreFavorite", favorite)
        },


        removeFavorite({commit}, params){
            commit("loading", true)
            axios.post(config.apiUrl + 'favorite/remove', {lesson_id: params}).then(() => {
                commit("loading", false)
                commit("removeFav", params)

            }).catch(() => {
                commit("loading", false)
            })
        },


    }
}