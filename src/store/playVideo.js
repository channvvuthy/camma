import axios from "axios"
import config from "./../config"
export default {
    namespaced: true,
    state: {
        video: [],
        loadingVideo: false,
        stop_watch: 0,
        loadingNextVideo: false,
    },

    mutations: {
        loadingPlay(state, status){
            state.loadingVideo = status
        },
        stopWatching(){

        },

        getVideoFromLink(state, video){
            state.video = video.streamingData
        },

        setUserLastWatch(state, stop_watch){
            state.stop_watch = stop_watch
        },
        NextVideo(state, status){
            state.loadingNextVideo = status
        }

    },

    actions: {
        gettingNextVideo({commit}, status){
            commit("NextVideo", status)
        },
        setLastWatch({commit}, lastWatch){
            commit("setUserLastWatch", lastWatch)
        },
        getVideoLink({commit, dispatch}, ytId){
            commit("loadingPlay", true)
            return new Promise((resolve, reject) => {
                axios.get(config.videoApi + ytId).then(response => {
                    commit("loadingPlay", false)
                    dispatch("getVideoSuccess", response.data)
                    let jsonOffset = response.data.indexOf('{');
                    let result = response.data.substring(jsonOffset);
                    let videos = JSON.parse(result)

                    resolve(videos.player_response.streamingData.formats)

                }).catch((error) => {
                    commit("loadingPlay", false)
                    reject(error)
                })
            })
        },

        getVideoSuccess({commit}, video){
            commit("getVideoFromLink", video)
        },
        stopWatch({commit}, params){

            commit("stopWatching")
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + '/lesson/stop_watch?lesson_id=' + params.lesson_id + "&mark=" + parseInt(params.mark) + "&duration=" + params.duration).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}