import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from "./../config"
import studentProfileData from "./../data/student"
import err from "./../helper/err"

Vue.use(Vuex);

export default {
    namespaced: true,
    state: {
        loginLoading: false,
        checking: false,
        changing: false,
        phone: null,
        loadingRegister: false,
        updatingPhoto: false,
        logout: false,
        ifUpdate: false,
        userChangingPassword: false,
        stProfile: studentProfileData,
        notifications: [],
        loadingNotification: false,
        loadingNotificationPagination: false,
        readingNotice: false,
        token: localStorage.getItem('token')
    },

    mutations: {
        receivingToken(state, token){
            state.token = token
        },
        readingNotification(state, status){
            state.readingNotice = status
        },
        loadingNotification(state, status){
            state.loadingNotification = status
        },
        loadingNotificationPagination(state, status){
            state.loadingNotificationPagination = status
        },
        receiveNotification(state, notifications){
            state.notifications = notifications
        },
        receiveNotificationPagination(state, notifications){
            for (let index = 0; index < notifications.length; index++) {
                state.notifications.push(notifications[index])
            }
        },
        loging(state, payload) {
            state.loginLoading = payload
        },

        changingForgotPassword(state, status){
            state.changing = status
        },

        studentProfile(state, stProfile){
            state.stProfile = stProfile
        },

        checkingPhone(state, status){
            state.checking = status
        },
        getPhoneNumber(state, phone){
            state.phone = phone
        },

        registering(state, status){
            state.loadingRegister = status
        },
        userLogout(state, status){
            state.logout = status
        },
        changingProfile(state, status){
            state.updatingPhoto = status
        },
        userChangingProfile(state, status){
            state.ifUpdate = status
        },
        userChangePassword(state, status){
            state.userChangingPassword = status
        },


    },

    actions: {
        login({
                  commit
              }, auth) {
            commit("loging", true);
            return new Promise((resolve, reject) => {

                axios.post(config.apiUrl + 'user/login', auth).then(response => {
                    if (response.data.status === 0) {
                        axios.defaults.headers.common['xtoken'] = response.data.data.token;
                    } else {
                        delete axios.defaults.headers.common['xtoken']
                    }
                    commit("loging", false);
                    resolve(response)
                }).catch(error => {
                    commit("loging", false);

                    reject(error)
                })
            })
        },
        checkPhoneExist({commit}, phone){
            commit("checkingPhone", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'user/check-exist-phone?phone=' + phone).then(response => {
                    commit("checkingPhone", false)
                    resolve(response.data)
                }).catch(error => {
                    commit("checkingPhone", false)
                    err.forgotPassword("សូមចាកចេញពី ឧបករណ៌ចាស់ជាមុនសិន")
                    reject(error)
                })
            })
        },
        changeForgotPassword({commit}, params){
            commit("changingForgotPassword", true)
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'user/password/forget-reset', params).then(response => {
                    commit("changingForgotPassword", false)
                    resolve(response.data)
                }).catch(err => {
                    commit("changingForgotPassword", false)
                    reject(err)
                })
            })
        },

        getPhone({commit}, phone){
            commit("getPhoneNumber", phone)
        },

        getStudentProfile({commit}, stProfile){
            commit("studentProfile", stProfile)
        },

        register({commit}, params){
            commit("registering", true)
            return new Promise((resolve, reject) => {
                delete axios.defaults.headers.common["xtoken"];

                axios.post(config.apiUrl + 'user/register', params).then(response => {
                    commit("registering", false)
                    resolve(response.data)
                }).catch(err => {
                    commit("registering", false)
                    reject(err)
                })
            })
        },

        async  logout({commit}){
            delete axios.defaults.headers.common['xtoken'];
            await  axios.get(config.apiUrl + 'user/logout').then(() => {

                localStorage.removeItem('token');
                localStorage.removeItem('stProfile');
                localStorage.removeItem('provinces');

                commit('userLogout', true)
            })
        },

        changeProfilePhotoPhoto({commit}, formData){
            commit('changingProfile', true)
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'user/change-photo',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                        return
                    }

                    commit('changingProfile', false)
                    resolve(response.data)
                }).catch(err => {
                    commit('changingProfile', false)
                    reject(err)
                })
            })
        },

        changeProfile({commit}, params){
            commit("userChangingProfile", true)
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'user/change-profile', params).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                        commit("userChangingProfile", false)
                        return
                    }

                    commit("userChangingProfile", false)
                    resolve(response.data)
                }).catch(err => {
                    commit("userChangingProfile", false)
                    reject(err)
                })
            })
        },
        userChangePassword({commit}, params){
            commit("userChangePassword", true)
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + "user/change-password", params).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                        commit('userChangePassword', false)
                        return
                    }

                    commit('userChangePassword', false)
                    resolve(response.data)
                }).catch(err => {
                    commit('userChangePassword', false)
                    reject(err)
                })
            })
        },

        getNotification({commit}, page = 1){
            if (page === 1) {
                commit("loadingNotification", true)
                return new Promise((resolve, reject) => {
                    axios.get(config.apiUrl + 'notification?p=' + page).then(response => {

                        if (response.data.status && response.data.status === 2) {
                            err.err(response.data.msg)
                        }


                        commit("loadingNotification", false)
                        commit("receiveNotification", response.data.data)
                        resolve(response.data.data)
                    }).catch(err => {
                        reject(err)
                    })
                })
            } else {
                commit("loadingNotificationPagination", true)
                return new Promise((resolve, reject) => {
                    axios.get(config.apiUrl + 'notification?p=' + page).then(response => {

                        if (response.data.status && response.data.status === 2) {
                            err.err(response.data.msg)
                        }


                        commit("loadingNotificationPagination", false)
                        commit("receiveNotificationPagination", response.data.data)
                        resolve(response.data.data)
                    }).catch(err => {
                        reject(err)
                    })
                })
            }
        },

        async readingNotification({commit}, id){
            commit('readingNotification', true)
            await axios.get(config.apiUrl + '/notification/read?id=' + id).then(() => {
                commit('readingNotification', false)
            }).catch(() => {
                commit('readingNotification', false)
            })
        },

        getToken({commit}, token){
            commit("receivingToken", token)
        }
    }
}