import auth from "./auth";
import course from "./course"
import favorite from "./favorite"
import playVideo from "./playVideo"
import payment from "./payment"
import  setting from "./setting"
import guardian from "./guardian"
import insurance from "./insurance"
import receipt from "./receipt"
import test from "./test"
import view from "./view"
import forum from "./forum"
import online from "./online"
import other from "./other"
import cart from "./cart"
import partner from "./partner"
import chat from "./chat"
import help from "./help"
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default  new Vuex.Store({
    modules: {
        auth,
        course,
        favorite,
        playVideo,
        cart,
        view,
        payment,
        setting,
        chat,
        test,
        other,
        help,
        guardian,
        insurance,
        receipt,
        online,
        forum,
        partner
    }
});