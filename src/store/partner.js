import axios from "axios"
import config from "./../config"
export default {
    namespaced: true,
    state: {
        partners: [],
        loadingPartner: false,
        openLoading: false,
        openUrl: {}
    },
    mutations: {
        receivingOpenPartner(state, openUrl){
            state.openUrl = openUrl
        },
        openingPartnerLoading(state, status){
            state.openLoading = status
        },
        loadingPartner(state, status){
            state.loadingPartner = status
        },
        gettingPartner(state, partners){
            state.partners = partners
        },
        addCartToPartner(state, payload){
            state.partners[payload.index].packages[payload.key].is_in_cart = 1
        },
    },
    actions: {
        getPartner({commit}){
            commit("loadingPartner", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + "partner").then(response => {
                    resolve(response.data)
                    commit("loadingPartner", false)
                    commit("gettingPartner", response.data.data)

                }).catch(err => {
                    reject(err)
                    commit("loadingPartner", false)

                })
            })
        },
        openPartner({commit}, course_id){
            commit("openingPartnerLoading", true)
            return new Promise((resovle, reject) => {
                axios.get(config.apiUrl + 'partner/open?course_id=' + course_id).then(response => {
                    resovle(response.data)
                    commit("openingPartnerLoading", false)
                    commit("receivingOpenPartner", response.data.data)
                }).catch(err => {
                    reject(err)
                    commit("openingPartnerLoading", false)
                })
            })
        }
    }
}