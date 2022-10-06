import axios from "axios"
import config from "./../config"
import err from "./../helper/err"

export default {
    namespaced: true,
    state: {
        guardians: [],
        loadingGuardian: false,
        loadingAdd: false,
        deleting: false,
    },
    mutations: {
        deletingGuardian(state, _id){
            state.guardians = state.guardians.filter(item => item._id !== _id)
        },
        loadingGuardian(state, status){
            state.loadingGuardian = status
        },
        receivingGuardian(state, guardians){
            state.guardians = guardians
        },
        loadAddingGuardian(state, status){
            state.loadingAdd = status
        }
    },

    actions: {
        getGuardian({commit}){
            commit("loadingGuardian", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'user/guardian').then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    commit("loadingGuardian", false)
                    commit("receivingGuardian", response.data.data)
                    resolve(response)
                }).catch(err => {
                    commit("loadingGuardian", false)
                    reject(err)
                })
            })
        },

        addingGuardian({commit}, params){
            commit("loadAddingGuardian", true)
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'user/guardian/add', params).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    commit("loadAddingGuardian", false)
                    resolve(response)
                }).catch(err => {
                    commit("loadAddingGuardian", false)
                    reject(err)
                })
            })
        },
        removeGuardian({commit}, _id){
            commit("deletingGuardian", _id)
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'user/guardian/remove', {_id}).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    resolve(response)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}