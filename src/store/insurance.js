import axios from "axios"
import config from "./../config"
import err from "./../helper/err"

export default {
    namespaced: true,
    state: {
        insuranceStatus: 0,
        checkingInsurance: false,
        loadingConfirm: false,
        userInsurance: ""
    },
    mutations: {
        getExpire(state, userInsurance){
            state.userInsurance = userInsurance
        },
        loadingConfirming(state, status){
            state.loadingConfirm = status
        },
        checkingInsurance(state, status){
            state.checkingInsurance = status
        },
        getInsuranceStatus(state, status){
            state.insuranceStatus = status
        }
    },
    actions: {
        checkInsurance({commit}){
            commit("checkingInsurance", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'user/insurance').then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    commit("checkingInsurance", false)
                    commit("getExpire", response.data.data)
                    commit("getInsuranceStatus", response.data.data.status)
                    resolve(response)
                }).catch(err => {
                    commit("checkingInsurance", false)
                    reject(err)
                })
            })
        },
        confirmInsurance({commit}, params){
            commit("loadingConfirming", true)
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + '/user/insurance/confirm', params).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    commit("loadingConfirming", false)
                    resolve(response)
                }).catch(err => {
                    commit("loadingConfirming", false)
                    reject(err)
                })
            })
        }
    }
}