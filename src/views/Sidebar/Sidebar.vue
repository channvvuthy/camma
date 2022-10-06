<template>
  <div class="font-khmer_os bg-white h-screen w-64 box-shadow text-nav">
    <div class="p-5">
      <div class="flex justify-center items-center">
        <img
          :src="stProfile.photo"
          class="rounded-full h-24 w-24 object-cover shadow border"
        />
      </div>
      <div class="text-center">
        <h1 class="mt-3 text-lg font-semibold text-gray-700">
          {{ stProfile.first_name }} {{ stProfile.last_name }}
        </h1>
      </div>
    </div>
    <hr />
    <div class="py-0 px-3 mt-3 pb-3">
      <ul
        class="
          list-outside
          bg-rose-200
          text-left
          mt-5
          leading-10
          font-khmer_os
          text-sm
        "
      >
        
        <li
          class="flex items-center hover:text-custom pointer cursor-pointer"
          :class="$route.name == 'favorite' ? 'text-custom' : ''"
          @mouseover="icons.favorite.original = icons.favorite.hover"
          @mouseout="icons.favorite.original = icons.favorite.out"
          @click="goTo('favorite')"
        >
          <FavoriteIcon
            :fill="
              $route.name == 'favorite'
                ? icons.favorite.hover
                : icons.favorite.original
            "
          ></FavoriteIcon>
          <span class="ml-2"> ចូលចិត្ត</span>
        </li>
      </ul>
    </div>
    <hr />
    <div class="py-0 px-3 mt-3 pb-3">
      <ul
        class="
          list-outside
          bg-rose-200
          text-left
          leading-10
          font-khmer_os
          text-sm
        "
      >
        <li
          class="flex items-center hover:text-custom pointer cursor-pointer"
          @click="goTo('change-profile')"
          :class="$route.name == 'change-profile' ? 'text-custom' : ''"
          @mouseover="
            icons.change_profile.original = icons.change_profile.hover
          "
          @mouseout="icons.change_profile.original = icons.change_profile.out"
        >
          <UserIcon
            :fill="
              $route.name == 'change-profile'
                ? icons.change_profile.hover
                : icons.change_profile.original
            "
          />
          <span class="ml-2">ព័ត៌មាន​ផ្ទាល់​ខ្លួន</span>
        </li>
        <li
          class="flex items-center hover:text-custom pointer cursor-pointer"
          :class="$route.name == 'lock' ? 'text-custom' : ''"
          @mouseover="icons.lock.original = icons.lock.hover"
          @mouseout="icons.lock.original = icons.lock.out"
          @click="goTo('lock')"
        >
          <div class="text-nav">
            <LockIcon
              :fill="
                $route.name == 'lock' ? icons.lock.hover : icons.lock.original
              "
            ></LockIcon>
          </div>
          <span class="ml-2">កែប្រែពាក្យសម្ងាត់</span>
        </li>
        <li
          class="flex items-center hover:text-custom pointer cursor-pointer"
          @click="goTo('other')"
          :class="$route.name == 'other' ? 'text-custom' : ''"
          @mouseover="icons.other.original = icons.other.hover"
          @mouseout="icons.other.original = icons.other.out"
        >
          <OtherIcon
            :fill="
              $route.name == 'other' ? icons.other.hover : icons.other.original
            "
          ></OtherIcon>
          <span class="ml-2">ផ្សេងៗ</span>
        </li>
      </ul>
    </div>
    <hr />
    <div class="py-0 px-3 mt-3">
      <ul
        class="
          list-outside
          bg-rose-200
          text-left
          mt-5
          leading-10
          font-khmer_os
          text-sm
        "
      >
        <li
          class="flex items-center hover:text-custom pointer cursor-pointer"
          @click="goTo('term')"
          :class="$route.name == 'term' ? 'text-custom' : ''"
          @mouseover="icons.term.original = icons.term.hover"
          @mouseout="icons.term.original = icons.term.out"
        >
          <TermAndConditionIcon
            :fill="
              $route.name == 'term' ? icons.term.hover : icons.term.original
            "
          ></TermAndConditionIcon>
          <span class="ml-2">លក្ខណ្ឌនៃការប្រើប្រាស់</span>
        </li>

        <li
          class="flex items-center hover:text-custom pointer cursor-pointer"
          @click="goTo('help')"
          :class="$route.name == 'help' ? 'text-custom' : ''"
          @mouseover="icons.help.original = icons.help.hover"
          @mouseout="icons.help.original = icons.help.out"
        >
          <HelpIcon
            :fill="
              $route.name == 'help' ? icons.help.hover : icons.help.original
            "
          ></HelpIcon>
          <span class="ml-2">ជំនួយបន្ថែម</span>
        </li>
        <li
          class="flex items-center hover:text-custom pointer cursor-pointer"
          :class="$route.name == 'about' ? 'text-custom' : ''"
          @click="goTo('about')"
          @mouseover="icons.about.original = icons.about.hover"
          @mouseout="icons.about.original = icons.about.out"
        >
          <InfoIcon
            :fill="
              $route.name == 'about' ? icons.about.hover : icons.about.original
            "
          ></InfoIcon>
          <span class="ml-2">អំពីយើង</span>
        </li>
      </ul>
    </div>
    <div
      class="absolute bottom-0 text-white cursor-pointer w-64"
      @click="userLogout"
    >
      <div
        class="
          font-khmer_os
          w-full
          p-3
          bg-custom
          hover:bg-opacity-90
          text-sm text-white text-center
          flex
          justify-center
        "
      >
        <LogoutIcon></LogoutIcon>
        <button class="focus:outline-none ml-2">ចាកចេញ</button>
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteIcon from "./../../components/FavoriteIcon.vue";
import LogoutIcon from "./../../components/LogoutIcon";
import LockIcon from "./../../components/LockIcon.vue";
import UserIcon from "./../../components/UserIcon.vue";
import OtherIcon from "./../../components/OtherIcon.vue";
import InfoIcon from "./../../components/InfoIcon.vue";
import HelpIcon from "./../../components/HelpIcon.vue";
import { mapActions } from "vuex";
import TermAndConditionIcon from "./../../components/InsuranceIcon.vue";

export default {
  name: "Sidebar",
  components: {
    FavoriteIcon,
    LockIcon,
    UserIcon,
    OtherIcon,
    InfoIcon,
    HelpIcon,
    LogoutIcon,
    TermAndConditionIcon,
    
  },
  props: {
    stProfile: {
      type: Object,
      default: function () {
        return {
          _id: null,
          last_name: null,
          first_name: null,
          phone: null,
          gender: null,
          group_type: null,
          grade_id: null,
          province: {
            _id: null,
            name: null,
          },
          school: {
            _id: null,
            name: null,
          },
          photo: "",
        };
      },
    },
  },
  data() {
    return {
      icons: {
        home: {
          original: "#2c384aae",
          out: "#2c384aae",
          hover: "#40b366",
        },
        course: {
          original: "#2c384aae",
          out: "#2c384aae",
          hover: "#40b366",
        },
        lock: {
          original: "#2c384aae",
          out: "#2c384aae",
          hover: "#40b366",
        },
        favorite: {
          original: "#2c384aae",
          out: "#2c384aae",
          hover: "#40b366",
        },
        other: {
          original: "#2c384aae",
          out: "#2c384aae",
          hover: "#40b366",
        },
        help: {
          original: "#2c384aae",
          out: "#2c384aae",
          hover: "#40b366",
        },
        change_profile: {
          original: "#2c384aae",
          out: "#2c384aae",
          hover: "#40b366",
        },
        about: {
          original: "#2c384aae",
          out: "#2c384aae",
          hover: "#40b366",
        },
        term: {
          original: "#2c384aae",
          out: "#2c384aae",
          hover: "#40b366",
        },
        guardian: {
          original: "#2c384aae",
          out: "#2c384aae",
          hover: "#40b366",
        },
        insurance: {
          original: "#2c384aae",
          out: "#2c384aae",
          hover: "#40b366",
        },
        invoice: {
          original: "#2c384aae",
          out: "#2c384aae",
          hover: "#40b366",
        },
        download: {
          original: "#2c384aae",
          out: "#2c384aae",
          hover: "#40b366",
        },
      },
    };
  },

  methods: {
    ...mapActions("auth", ["logout"]),
    goTo(route) {
      if (route !== this.$route.name) {
        this.$router.push({ name: `${route}` });
      }
    },
    redirectTo() {
      localStorage.removeItem("token");
      localStorage.removeItem("stProfile");
      localStorage.removeItem("provinces");

      this.$router.push({
        name: "login",
      });
    },
    userLogout() {
      this.logout()
        .then(() => {
          this.redirectTo();
        })
        .catch(() => {
          this.redirectTo();
        });
    },
  },
};
</script>