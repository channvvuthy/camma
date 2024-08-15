import config from "./../config"
import axios from "axios"
export  default {
    namespaced: true,
    state: {
        provinces: [],
        loadingProvince: false,
        loadingSchool: false,
        schools: [],
        routeName: ""
    },
    mutations: {
        setRouteName(state, value){
            state.routeName = value;
        },
        gettingProvince(state, status){
            state.loadingProvince = status
        },

        getAllProvince(state, province){
            state.provinces = province
        },
        gettingSchool(state, status){
            state.loadingSchool = status
        },
        getAllSchool(state, school){
            state.schools = school
        },
    },
    actions: {
        getProvinces({commit}){
            if (localStorage.getItem('provinces')) {
                commit("getAllProvince", JSON.parse(localStorage.getItem('provinces')))
            } else {
                commit("gettingProvince", true)
                return new Promise((resolve, reject) => {
                    axios.get(config.apiUrl + 'province').then(response => {
                        commit("gettingProvince", false)
                        commit("getAllProvince", response.data.data)
                        localStorage.setItem('provinces', JSON.stringify(response.data.data))
                        resolve(response.data)
                    }).catch(err => {
                        commit("gettingProvince", false)
                        reject(err)
                    })
                })
            }
        },
        getSchool({commit}, province_id){
            commit("gettingSchool", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + `province/school?province_id=${province_id }`).then(response => {
                    setTimeout(() => {
                        commit("gettingSchool", false)
                    }, 1000)
                    commit("getAllSchool", response.data.data)
                    resolve(response.data)
                }).catch(err => {
                    commit("gettingSchool", false)
                    reject(err)
                })
            })
        },
        companyInfo(){
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'company/info').then(response => {
                    resolve(response.data.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}