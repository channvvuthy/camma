import axios from "axios"
import config from "./../config"

export default {
    namespaced: true,
    state: {
        grades: [],
        loadingGrade: false,
        quizzes: [],
        loadingQuiz: false
    },
    mutations: {
        loadingGrade(state, status){
            state.loadingGrade = status
        },
        receivingGrade(state, grades){
            state.grades = grades
        },
        loadingQuiz(state, status){
            state.loadingQuiz = status
        },
        receivingQuiz(state, quizzes){
            state.quizzes = quizzes
        }
    },

    actions: {
        getGrade({commit}){
            commit("loadingGrade", true)
            return new Promise((resolve, reject) => {
                axios.get(config.webViewUrl + 'page/quiz').then(response => {
                    commit("loadingGrade", false)
                    commit("receivingGrade", response.data)
                    resolve(response)
                }).catch(err => {
                    commit("loadingGrade", true)
                    reject(err)
                })
            })
        },
        getQuiz({commit}, params){
            commit("loadingQuiz", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + "quiz/list?grade_id=" + params.grade_id + "&subject_id=" + params.subject_id).then(response => {
                    commit("loadingQuiz", false)
                    commit("receivingQuiz", response.data.data)
                    resolve(response)
                }).catch(err => {
                    commit("loadingQuiz", false)
                    reject(err)
                })
            })
        }
    },

}