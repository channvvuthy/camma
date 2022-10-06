<template>
    <div class="bg-white h-screen pb-20 py-3">
        <div v-if="loadingTerm " class="flex justify-center items-center h-screen relative -top-5">
            <h1 class="text-sm font-semibold font-khmer_os relative -top-10">
                <loading></loading>
            </h1>
        </div>
        <div class="relative -mt-2" v-else>
            <div class="absolute bg-white left-0 h-8 top-0 w-20"></div>
            <div class="border border-t-0 border-l-0 border-r-0 border-gray-200 absolute h-12 left-0 -top-3"
                 style="width: 97%"></div>
            <iframe :srcdoc="termAndCondition" class="w-full h-screen pb-20"></iframe>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState} from "vuex"
    import Loading from "./../../components/Loading"
    export default{
        name: "TermAndCondition",
        components: {
            Loading
        },
        computed: {
            ...mapState('view', ['termAndCondition', 'loadingTerm'])
        },
        methods: {
            ...mapActions('view', ['getTerm']),
        },

        created(){
            this.getTerm()
        },
    }
</script>