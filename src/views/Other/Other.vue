<template>
  <div class="bg-white overflow-y-scroll">
    <div
      v-if="loadingOther"
      class="flex justify-center items-center h-screen relative -top-5"
    >
      <h1 class="text-sm font-semibold font-khmer_os relative top-0">
        <loading />
      </h1>
    </div>
    <div class="relative" v-else>
      <div class="absolute h-9 transparent w-100 left-0 top-0 cursor-pointer" @click="reloadOther()"></div>
      <iframe id="otherFrame" class="w-full h-screen pb-20" :srcdoc="other" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Loading from "./../../components/Loading";
export default {
  name: "Other",
  components: {
    Loading,
  },
  computed: {
    ...mapState("other", ["other", "loadingOther"]),
  },
  methods: {
    ...mapActions("other", ["getOther"]),
    reloadOther(){
        this.$router.push("/reload_ther")
    }
  },
  updated() {
    const iframe = document.getElementById("otherFrame");
    const iframeWin = iframe.contentWindow || iframe;
    const iframeDoc = iframe.contentDocument || iframeWin.document;
    var script = iframeDoc.createElement("script");
    script.append(`
                window.onload = function() {
                 document.body.addEventListener('click', function(event){
                     if(event.target.innerHTML ==='&nbsp;'){
                         event.preventDefault()
                     }
                 }, true);
              }
            `);
    iframeDoc.documentElement.appendChild(script);
  },
  created() {
    this.getOther();
  },
};
</script>