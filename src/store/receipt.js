import config from "./../config"
import axios from "axios"
import err from "./../helper/err"

export default {
    namespaced: true,
    state: {
        receipts: [],
        receiptDetail: [],
        takingReceipt: false,
        deleting: false,
        loadingReceipt: false,

    },
    mutations: {
        deletedReceipt(state, _id){
            state.receipts = state.receipts.filter(item => item._id !== _id)
        },
        gettingReceipt(state, receipts){
            state.receipts = receipts
        },
        takingReceipt(state, status){
            state.takingReceipt = status
        },
        loadingReceipt(state, status){
            state.loadingReceipt = status
        },
        receivingReceipt(state, receiptDetail){
            state.receiptDetail = receiptDetail
        },
        removingReceipt(state, status){
            state.deleting = status
        }
    },

    actions: {
        getReceiptDetail({commit}, id){
            commit("loadingReceipt", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'payment/receipt/detail?id=' + id).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    commit("loadingReceipt", false)
                    commit("receivingReceipt", response.data.data)
                    resolve(response)
                }).catch(err => {
                    commit("loadingReceipt", false)
                    reject(err)
                })
            })
        },
        deleteReceipt({commit}, id){
            commit("removingReceipt", true)
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'payment/receipt/delete', {id}).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    commit("removingReceipt", false)
                    commit("deletedReceipt", id)
                    resolve(response)
                }).catch(err => {
                    commit("removingReceipt", false)
                    reject(err)
                })
            })
        },

        getReceipt({commit}, status = 0){
            commit("takingReceipt", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'payment/receipt?status=' + status).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    commit("takingReceipt", false)
                    commit('gettingReceipt', response.data.data)
                    resolve(response)
                }).catch(err => {
                    commit("takingReceipt", false)
                    reject(err)
                })
            })
        },
    }
}