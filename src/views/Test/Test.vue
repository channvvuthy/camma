<template>
    <div class="bg-white h-screen overflow-y-scroll">
        <div v-if="loadingGrade" class="flex justify-center items-center h-screen relative -top-5">
            <h1 class="text-sm font-semibold font-khmer_os relative -top-10">
                <loading></loading>
            </h1>
        </div>
        <div v-else>
            <iframe id="otherFrame" class="w-full h-screen pb-20" :srcdoc="grades"></iframe>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import Loading from "./../../components/Loading"
export default {
    components: {
        Loading
    },
    computed: {
        ...mapState('test', ['grades', 'loadingGrade', 'quizzes', 'loadingQuiz'])
    },
    data() {
        return {
            active: {
                _id: {
                    grade: "",
                    subject: "",
                }
            }
        }
    },
    methods: {
        ...mapActions('test', ['getGrade', 'getQuiz']),
    },
    created() {
        this.getGrade()
    },
}

</script>
