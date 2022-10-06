import axios from "axios"
import config from "./../config"
import err from "./../helper/err"

export default {
    namespaced: true,

    state: {
        cart: [],
        loadingCart: false,
        checkingCoupon: false,
        removingCart: false,
        deletingCoupon: false,
        cartAdded: [],
        removedCart: ""


    },

    mutations: {
        cartList(state, cart){
            state.cart = cart
        },

        loading(state, status){
            state.loadingCart = status
        },

        checkingCoupExist(state, status){
            state.checkingCoupon = status
        },

        deleteCart(state, status){
            state.removingCart = status
        },

        removeCartFromList(state, course_id){
            state.removedCart = course_id;
            let cart = state.cart.list.filter(item => item._id != course_id);
            state.cart.list = cart

            for (var i = 0; i < state.cartAdded.length; i++) {

                if (state.cartAdded[i] === course_id) {

                    state.cartAdded.splice(i, 1);
                }

            }

        },

        removingCoupon(state, status){
            state.deletingCoupon = status
        },

        updatingDuration(state, params){
            state.cart.list.filter(items => {
                if (items._id === params._id) {
                    items.price['duration'] = params.duration
                }
                return items
            })
        },

        updateCartAlert(state, cartAdded){
            state.cartAdded.push(cartAdded)
        },

    },

    actions: {
        addCart({commit,}, course_id){
            commit("loading", true);
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'cart/add', {course_id}).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    commit("loading", false);
                    resolve(response.data)
                }).catch(err => {
                    commit("loading", false);
                    reject(err)
                })
            })
        },

        getCart({commit}){
            commit("loading", true);
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'cart').then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }

                    commit("loading", false);
                    commit("cartList", response.data.data);
                    resolve(response.data)
                }).catch(err => {
                    commit("loading", false);
                    reject(err)
                })
            })
        },

        checkCoupon({commit}, code){
            commit("checkingCoupExist", true);
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'cart/coupon', {code: code}).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    commit("checkingCoupExist", false);
                    resolve(response.data)
                }).catch(error => {
                    commit("checkingCoupExist", false);
                    reject(error)
                })
            })
        },

        removeCart({commit}, course_id){
            commit("deleteCart", true);
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'cart/remove', {course_id: course_id}).then(response => {
                    commit("deleteCart", false);
                    commit("removeCartFromList", course_id);
                    resolve(response.data)
                }).catch(err => {
                    commit("deleteCart", false);
                    reject(err)
                })
            })
        },

        deleteCoupon({commit}){
            commit("removingCoupon", true)
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + '/cart/remove_coupon').then(() => {
                    commit("removingCoupon", false)
                    resolve()
                }).catch(() => {
                    commit("removingCoupon", false)
                    reject()

                })
            })
        },

        async updateDuration({commit}, params){
            await  commit("updatingDuration", params)
        },

        cartAlert({commit}, cart_id){
            commit("updateCartAlert", cart_id)
        }
    }
}