import axios from "axios"
import config from "./../config"
const apiUrlPay = 'https://e-schoolcambodia.com/payment'
export default {
    namespaced: true,
    state: {
        loadingCheckout: false,
        checkoutData: null,
        transaction: null,
        abaPaying: false,
        wingPaying: false,
    },
    mutations: {
        loadingCheckout(state, status){
            state.loadingCheckout = status
        },

        getCheckout(state, checkoutData){
            state.checkoutData = checkoutData
        },

        gettingTransaction(state, transaction){
            state.transaction = transaction
        },

        abaPaying(state, abaPaying){
            state.abaPaying = abaPaying
        },

        wingPaying(state, status){
            state.wingPaying = status
        }
    },
    actions: {
        checkout({commit}, params){
            commit("loadingCheckout", true)
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'cart/checkout', params).then(response => {
                    commit("loadingCheckout", false)
                    commit("getCheckout", response.data)
                    resolve(response.data)
                }).catch(error => {
                    commit("loadingCheckout", false)
                    reject(error)
                })
            })
        },

        getTransaction({commit}, transaction){
            commit("gettingTransaction", transaction)
        },

        abaPay({commit}, params){
            commit("abaPaying", true)
            return new Promise((resolve, reject) => {
                axios.get(apiUrlPay + `/aba?phone=${params.phone}&tran_id=${params.tran_id}&e_key=${params.e_key}&amount=${params.amount}&firstname=${params.firstname}&lastname=${params.lastname}&payment_option=${params.payment_option}`)
                    .then(response => {
                        resolve(response.data)
                    }).catch(err => {
                    reject(err)
                })
            })
        },

        wingPay({commit}, params){
            commit("wingPaying", true)
            return new Promise((resolve, reject) => {
                axios.get(apiUrlPay + `/wing?phone=${params.phone}&tran_id=${params.tran_id}&e_key=${params.e_key}&amount=${params.amount}&firstname=${params.firstname}&lastname=${params.lastname}`)
                    .then(response => {
                        commit("wingPaying", false)
                        resolve(response.data)
                    }).catch(err => {
                    commit("wingPaying", false)
                    reject(err)
                })
            })
        }

    }

}