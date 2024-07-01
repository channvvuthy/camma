import config from "./../config"
import axios from "axios"
import err from "./../helper/err"

export default {
    namespaced: true,
    state: {
        groups: [],
        loadingGroup: false,
        readingChat: false,
        readingChatPagination: false,
        chats: [],
        loadingGroupPagination: false,
        loadAddingChat: false,
        mentions: [],
        loadingMention: false,

    },
    mutations: {
        deleteMessage(state, messageId) {
            state.chats = state.chats.map(item => {
                if (item._id === messageId) {
                    item.is_delete = 1;
                }
                return item;
            });
        },
        loadingMention(state, status){
            state.loadingMention = status
        },
        receivingMention(state, mentions){
            state.mentions = mentions
        },
        addingChat(state, status){
            state.loadAddingChat = status
        },
        addingLocalCat(state, chart){
            state.chats.push(chart)
        },
        receivingChat(state, chart){
            if (chart.content.type === 2) {
                state.chats.push(chart)
            }

        },

        receivingGroupChatPagination(state, chats){
            if (chats && chats.length > 0) {
                for (let index = 0; index < chats.length; index++) {
                    state.chats.unshift(chats[index])
                }
            }

        },
        receivingGroupChat(state, chats){
            if (chats && chats.length) {
                state.chats = chats.reverse()
            }

        },
        loadReadingGroupChat(state, status){
            state.readingChat = status
        },
        loadReadingGroupChatPagination(state, status){
            state.readingChatPagination = status
        },
        loadingGroup(state, status){
            state.loadingGroup = status
        },
        loadingGroupPagination(state, status){
            state.loadingGroupPagination = status
        },
        receiveGroupChat(state, groups){
            state.groups = groups
        },
        receiveGroupChatPagination(state, groups){
            for (let index = 0; index < groups.length; index++) {
                state.groups.push(groups[index])
            }
        }
    },
    actions: {
        getGroupChat({commit}, page = 1){
            if (page === 1) {
                commit("loadingGroup", true)
                return new Promise((resolve, reject) => {
                    axios.get(config.apiUrl + 'chat/group').then(response => {

                        if (response.data.status && response.data.status === 2) {
                            err.err(response.data.msg)
                        }


                        commit("loadingGroup", false)
                        commit("receiveGroupChat", response.data.data)
                        resolve(response.data.data)
                    }).catch(err => {
                        commit("loadingGroup", false)
                        reject(err)
                    })
                })
            } else {
                commit("loadingGroupPagination", true)
                return new Promise((resolve, reject) => {
                    axios.get(config.apiUrl + 'chat/group?p=' + page).then(response => {

                        if (response.data.status && response.data.status === 2) {
                            err.err(response.data.msg)
                        }


                        commit("loadingGroupPagination", false)
                        commit("receiveGroupChatPagination", response.data.data)
                        resolve(response.data.data)
                    }).catch(err => {
                        commit("loadingGroupPagination", false)
                        reject(err)
                    })
                })
            }
        },
        readingGroupChat({commit}, params){
            commit('loadReadingGroupChat', true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'chat/read?group_id=' + params.group_id).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    commit('loadReadingGroupChat', false)
                    commit("receivingGroupChat", response.data.data)
                    resolve(response.data.data)
                }).catch((err) => {
                    commit('loadReadingGroupChat', false)
                    reject(err)
                })
            })
        },
        readingGroupChatting({commit}, params){
            commit('loadReadingGroupChatPagination', true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'chat/read?group_id=' + params.group_id + "&p=" + params.page).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    commit('loadReadingGroupChatPagination', false)
                    commit("receivingGroupChatPagination", response.data.data)
                    resolve(response.data.data)
                }).catch((err) => {
                    commit('loadReadingGroupChatPagination', false)
                    reject(err)
                })
            })
        },
        addChat({commit}, params){
            commit("addingChat", true)
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'chat/add', params).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    commit("addingChat", false)
                    commit("receivingChat", response.data.data)
                    resolve(response.data.data)
                }).catch(err => {
                    commit("addingChat", false)
                    reject(err)
                })
            })
        },
        addingLocalChat({commit}, params){
            commit("addingLocalCat", params)
        },
        getMention({commit}, params){
            commit("loadingMention", true)
            return new Promise((resolve, reject) => {
                axios.get(config.apiUrl + 'chat/mention?group_id=' + params.group_id + "&name=" + params.name).then(response => {

                    if (response.data.status && response.data.status === 2) {
                        err.err(response.data.msg)
                    }


                    commit("loadingMention", false)
                    commit("receivingMention", response.data.data)
                    resolve(response.data.data)

                }).catch(err => {
                    commit("loadingMention", false)
                    reject(err)
                })
            })
        },

        deleteMessage({commit}, message_id){
            return new Promise((resolve, reject) => {
                axios.post(config.apiUrl + 'chat/delete',{message_id}).then(response => {
                    resolve(response.data.data)
                    commit("deleteMessage", message_id)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}