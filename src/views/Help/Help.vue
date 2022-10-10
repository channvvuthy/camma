<template>
  <div class="bg-white h-screen p-5 font-khmer_os">
    <div
      v-if="loadingHelp"
      class="flex justify-center items-center h-screen relative -top-5"
    >
      <h1 class="text-sm font-semibold font-khmer_os relative -top-10">
        <loading />
      </h1>
    </div>
    <div v-else>
      <div class="grid grid-cols-3 gap-4 font-khmer_os text-sm">
        <div
          class="cursor-pointer"
          v-for="(h, key) in help"
          :key="key"
          @click="getHelpDetail(h)"
        >
          <img :src="h.thumbnail" alt="" />
          <div class="mt-2">{{ h.title }}</div>
        </div>
      </div>
    </div>
    <Detail
      v-if="showDetail"
      @dismiss="closeDetail"
      :videoActive="videoActive"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Detail from "./components/Detail";
import Loading from "./../../components/Loading";
export default {
  name: "Help",
  components: {
    Detail,
    Loading,
  },
  data() {
    return {
      showDetail: false,
      loading: true,
      videoActive: {},
    };
  },
  computed: {
    ...mapState("help", ["help", "loadingHelp"]),
  },

  methods: {
    ...mapActions("help", ["getHelp"]),
    closeDetail() {
      this.showDetail = false;
    },
    getHelpDetail(help) {
      this.videoActive = help;
      this.showDetail = true;
    },
  },
  created() {
    this.getHelp();
  },
};
</script>