<template>
    <div class="bg-white overflow-y-scroll">
        <div v-if="loadingOther" class="flex justify-center items-center h-screen relative -top-5">
            <h1 class="text-sm font-semibold font-khmer_os relative top-0">
                <loading></loading>
            </h1>
        </div>
        <div v-else>
            <iframe id="otherFrame" class="w-full h-screen pb-20" :srcdoc="other"></iframe>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import Loading from "./../../components/Loading"
    export default{
        name: "Other",
        components: {
            Loading
        },
        computed: {
            ...mapState('other', ['other', 'loadingOther'])
        },
        methods: {
            ...mapActions('other', ['getOther']),
        },
        updated(){
            const iframe = document.getElementById('otherFrame');
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
        created(){
            this.getOther()
        },
    }
</script>