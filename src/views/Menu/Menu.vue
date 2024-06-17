<template>
  <div class="bg-white">
    <div class="flex justify-between px-5 pt-3">
      <div class="menu">
        <ul class="flex font-khmer_os items-center justify-between text-base">
          <li v-for="item in menuItems" :key="item.route" 
              :class="['flex items-center rounded-lg px-4 py-2 cursor-pointer', { 'ml-10': item.route !== 'home', 'bg-custom text-white': $route.name === item.route }]" 
              @click="goTo(item.route)">
            <component :is="item.icon" :fill="$route.name === item.route ? '#FFF' : '#000'" :size="22"/>
            <p class="ml-2">{{ item.label }}</p>
          </li>
        </ul>
      </div>
      <div>
        <ul class="flex justify-end items-center mt-3">
          <li class="mr-5 cursor-pointer relative" @click="showCartForm">
            <span v-if="cart?.list?.length" class="rounded-full w-5 h-5 bg-red-500 absolute -top-3 -right-3 text-white flex justify-center items-center text-13px">
              {{ cart.list.length }}
            </span>
            <DiscussionIcon />
          </li>
          <li class="cursor-pointer" @click="showNotificationForm">
            <NotificationIcon />
          </li>
        </ul>
      </div>
    </div>
    <div class="border-b border-gray-200 mt-2 pl-3"></div>
    <Cart v-if="showCart" @closeCart="closeCart" />
    <Notification v-if="showNotification" @closeNotification="closeNotification" @readNotification="readNotification" />
    <NotificationDetail v-if="showNotificationDetail" :notification="notification" @closeNotificationDetail="closeNotificationDetail" />
  </div>
</template>

<script>
import HomeIcon from "./../../components/HomeIcon.vue";
import BookIcon from "./../../components/BookIcon.vue";
import VideoIcon from "./../../components/VideoIcon.vue";
import TestIcon from "./../../components/TestIcon.vue";
import DiscussionIcon from "./../../components/DiscussionIcon.vue";
import NotificationIcon from "./../../components/NotificationIcon.vue";
import Cart from "./../MyCourse/components/Cart.vue";
import Notification from "./../../components/Notification.vue";
import NotificationDetail from "./../../components/NotificationDetail.vue";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    HomeIcon,
    BookIcon,
    VideoIcon,
    TestIcon,
    NotificationIcon,
    DiscussionIcon,
    Cart,
    Notification,
    NotificationDetail,
  },
  data() {
    return {
      showCart: false,
      showNotification: false,
      showNotificationDetail: false,
      notification: {},
      menuItems: [
        { route: 'home', icon: HomeIcon, label: 'ទំព័រដើម' },
        { route: 'video', icon: VideoIcon, label: 'វីដេអូ' },
        { route: 'book', icon: BookIcon, label: 'សៀវភៅ' },
        { route: 'test', icon: TestIcon, label: 'តេស្ត' },
      ],
    };
  },
  computed: {
    ...mapState("cart", ["cart"]),
  },
  methods: {
    ...mapActions("cart", ["getCart"]),
    showCartForm() {
      this.$router.push("discuss");
    },
    closeNotification() {
      this.showNotification = false;
    },
    showNotificationForm() {
      this.showNotification = true;
    },
    readNotification(notification) {
      this.notification = notification;
      this.showNotificationDetail = true;
    },
    closeNotificationDetail() {
      this.showNotificationDetail = false;
    },
    closeCart() {
      this.showCart = false;
    },
    goTo(route) {
      if (route !== this.$route.name) {
        this.$router.push({ name: route });
      }
    },
  }
};
</script>
