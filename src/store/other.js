import axios from "axios"
import config from "./../config"
import err from "./../helper/err"


export default {
    namespaced: true,
    state: {
        other: "",
        loadingOther:false,
    },
    mutations: {
        loadingOther(state, status){
            state.loadingOther = status
        },
        receivingOther(state, other){
            state.other = other
        }
    },

    actions: {
        getOther({commit}){
            commit("loadingOther", true)
            return new Promise((resolve, reject) => {
                axios.get(config.webViewUrl + "page/other").then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    commit("loadingOther", false)
                    commit("receivingOther", response.data)
                    resolve(response)
                }).catch(err => {
                    commit("loadingOther", false)
                    reject(err)
                })
            })
        }
    },

}