import axios from "axios";
import err from "./../helper/err";

export default {
  namespaced: true,
  state: {
    online: true
  },
  mutations: {
    setOnlineStatus(state, online) {
      state.online = online;
    }
  },
  actions: {
    /**
     * Checks the online status by making a GET request to "https://www.google.com".
     * If the request is successful, it commits the "setOnlineStatus" mutation with a value of true.
     * If the request fails, it commits the "setOnlineStatus" mutation with a value of false and displays an error message.
     *
     * @param {Object} context - The Vuex context object.
     * @param {Function} context.commit - The function to commit a mutation.
     * @return {Promise} A promise that resolves when the online status is checked.
     */
    async checkOnlineStatus({ commit }) {
      try {
        await axios.get("https://www.google.com");
        commit("setOnlineStatus", true);
      } catch {
        commit("setOnlineStatus", false);
        err.connectionErr("សូមពិនិត្យការភ្ជាប់អ៊ីនធឺណិតរបស់អ្នកឬព្យាយាមម្តងទៀតពេលក្រោយ");
      }
    }
  }
};



