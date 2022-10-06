import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Auth/Login'
import MyCourse from '../views/MyCourse/MyCourse'
import {auth} from './../middlware/auth'
import CourseDetail from "../views/MyCourse/CourseDetail"
import store from "../store"

Vue.use(VueRouter);

const routes = [

    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/my-course',
        name: 'my-course',
        component: MyCourse,
    },
    {
        path: '/download',
        name: 'download',
        component: () => import('../views/Download/Download'),
    },
    {
        path: '/download-detail',
        name: 'download-detail',
        component: () => import('../views/Download/VideoDetail'),
    },
    {
        path: '/book',
        name: 'book',
        component: () => import('../views/Book/Book'),
    },
    {
        path: '/partner',
        name: 'partner',
        component: () => import('../views/Partner/Partner'),
    },
    {
        path: '/discuss',
        name: 'discuss',
        component: () => import('../views/Discuss/Discuss'),
    },
    {
        path: '/video',
        name: 'video',
        component: () => import('../views/Video/Video'),
    },
    {
        path: '/favorite',
        name: 'favorite',
        component: () => import('../views/Favorite/Favorite'),
    },
    {
        path: '/other',
        name: 'other',
        component: () => import('../views/Other/Other'),
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('../views/Help/Help'),
    },
    {
        path: '/term',
        name: 'term',
        component: () => import('../views/Term/Term'),
    },
    {
        path: '/guardian',
        name: 'guardian',
        component: () => import('../views/Guardian/Guardian'),
    },
    {
        path: '/insurance',
        name: 'insurance',
        component: () => import('../views/Insurance/Insurance'),
    },
    {
        path: '/invoice',
        name: 'invoice',
        component: () => import('../views/Invoice/Invoice'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/About/About'),
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/Test/Test'),
    },
    {
        path: '/lock',
        name: 'lock',
        component: () => import('../views/Lock/Lock'),
    },
    {
        path: '/change-profile',
        name: 'change-profile',
        component: () => import('../views/Profile/Profile'),
    },
    {
        path: '/course-detail/:videoId/:/order/:courseId',
        name: 'course-detail',
        component: CourseDetail
    },


];

const router = new VueRouter({
    mode: process.env.IS_ELECTRON ? 'hash' : 'history',
    historyApiFallback: true,
    base: process.env.BASE_URL,
    routes
});
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        if (auth()) {
            next({
                name: 'home'
            })
        } else {
            next()
        }
    } else {
        if (auth()) {

            store.commit("course/getFilterByGradeID","")
            store.commit("course/getQueryString","")

            next()
        } else {
            next({
                name: 'login'
            })
        }
    }
    next()
});

export default router
