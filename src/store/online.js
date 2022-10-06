import axios from "axios"
import config from "./../config"
import err from "./../helper/err"
export default {
    namespaced: true,
    state: {
        online: true
    },
    mutations: {
        onlineOffline(state, online){
            state.online = online
        }
    },
    actions: {
        onlineOffline({commit}){
            axios.get(config.baseUrl).then(() => {
                commit("onlineOffline", true)
            }).catch(() => {
                commit("onlineOffline", false)
                err.connectionErr("សូមពិនិត្យការភ្ជាប់អ៊ីនធឺណិតរបស់អ្នកឬព្យាយាមម្តងទៀតពេលក្រោយ")
            })
        }
    }

}