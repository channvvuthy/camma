<template>
    <div class="bg-white h-screen  p-5 font-khmer_os">
        <div v-if="loadingHelp" class="flex justify-center items-center h-screen relative -top-5">
            <h1 class="text-sm font-semibold font-khmer_os relative -top-10">
                <loading></loading>
            </h1>
        </div>
        <div v-else>
            <div class="grid grid-cols-4 gap-4 font-khmer_os text-sm">
                <div class="cursor-pointer" v-for="(h,key) in help" :key="key" @click="getHelpDetail(h)">
                    <img :src="h.thumbnail" alt="">
                    <div class="mt-2">{{h.title}}</div>
                </div>
            </div>
        </div>
        <Detail v-if="showDetail" @closeDetail="closeDetail" :youTubeId="youTubeId" :title="title"></Detail>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex"
    import Detail from "./components/Detail"
    import Loading from "./../../components/Loading"
    const {ipcRenderer} = require('electron')
    export default{
        name: "Help",
        components: {
            Detail,
            Loading
        },
        data(){
            return {
                showDetail: false,
                loading: true,
                youTubeId: "",
                title: "",
            }
        },
        computed: {
            ...mapState('help', ['help', 'loadingHelp'])
        },

        methods: {
            ...mapActions('help', ['getHelp']),
            closeDetail(){
                this.showDetail = false
            },
            getHelpDetail(help){
                this.title = help.title
                this.youTubeId = help.youtube_url
                ipcRenderer.send('youtubeVideo', help.youtube_url)
                this.showDetail = true
            }
        },
        created(){
            this.getHelp()
        }
    }
</script>