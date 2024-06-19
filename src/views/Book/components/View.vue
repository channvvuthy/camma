<template>
  <div class="fixed z-50 inset-0 overflow-y-auto">
    <div class="
        flex
        items-end
        justify-center
        min-h-screen
        text-center
        sm:block sm:p-0
      ">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="
          inline-block
          align-bottom
          bg-white
          rounded-xl
          text-left
          shadow-xl
          transform
          transition-all
          sm:align-middle
        " :class="`w-${size}`" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="bg-white font-khmer_os relative rounded-xl">
          <div class="flex-cols items-center">
            <div class="flex justify-between items-center p-5 border-b">
              <div class="flex-1 text-center">{{ view.title }}</div>
              <div class="
                  cursor-pointer
                  absolute
                  -top-4
                  -right-4
                  w-8
                  h-8
                  flex
                  items-center
                  justify-center
                  bg-custom
                  rounded-full
                " @click="closeView">
                <CloseIcon :size="20" fill="#FFF" />
              </div>
            </div>
            <div class="relative pb-10" style="max-height: 600px; overflow-y: scroll">
              <div class="bg-white pt-5 relative">
                <img :src="view.thumbnail" class="m-auto" style="max-width: 90%" />
              </div>
              <div class="px-5 pt-5">
                <div
                  class="bg-custom text-center text-white p-2 font-medium cursor-pointer flex justify-center items-center border-t rounded-full"
                  @click="read(view._id, view.title)">
                  <span>អានសៀវភៅ</span>
                  <img src="/ajax-loader.gif" v-if="loading" class="ml-2" />
                </div>
              </div>
              <div class="p-5">
                <p>{{ view.title }}</p>
                <p>ម្ចាស់សៀវភៅ៖ {{ view.teacher.name }}</p>
                <p class="mt-5 mr-5 text-13px" v-html="view.des" style="white-space: pre-wrap"></p>
              </div>
            </div>
          </div>

          <button class="
              fixed
              bottom-0
              bg-blue
              w-full
              p-3
              bg-custom
              text-center text-white
              cursor-pointer
              focus:outline-none
            " :disabled="loadingCart" v-if="view.price.year">
            <span v-text="view.is_buy ? 'បន្តសុពលភាព' : 'ទិញ'"></span>
            <span v-if="loadingCart">
              <Loader :size="10" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from "./../../../components/CloseIcon.vue";
import Loader from "./../../../components/Loader.vue";

export default {
  name: "ViewBook",
  components: {
    CloseIcon,
    Loader,
  },
  props: {
    cartId: {
      type: String,
      default: () => {
        return "";
      },
    },
    loading: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    view: {
      type: Object,
    },
    size: {
      type: Number,
      default: () => {
        return 96;
      },
    },
    hide: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },

  methods: {
    closeView($event) {
      this.$emit("closeView", $event);
    },
    read(id, title) {
      this.$emit("read", { id, title });
    },
  },
};
</script>