<template>
    <div class="fixed flex items-center justify-center left-0 top-0 h-full w-full bg-black bg-opacity-90 z-50">
        <div class="w-96 bg-white rounded-2xl shadow">
            <!-- Modal header -->
            <div class="relative flex items-center justify-center h-10 border-b">
                <span>View Comment</span>
                <div class="h-8 w-8 bg-custom rounded-full cursor-pointer flex items-center justify-center absolute -right-4 -top-4"
                    @click="onClose">
                    <CloseIcon fill="#fff" />
                </div>
            </div>

            <!-- Body modal -->
            <div class="px-5">
                <!-- Original comment -->
                <div class="flex mb-5 border-b py-3">
                    <div class="flex items-start">
                        <div class="w-14 h-14">
                            <div class="w-14 h-14 rounded-full bg-center bg-cover bg-custom flex-1"
                                :style="{ backgroundImage: `url(${forumProps.user.photo})` }">
                            </div>
                        </div>
                        <div>
                            <div class="ml-4 flex items-center">
                                <div class="text-sm font-semibold">{{ forumProps.user.name }}</div>
                                <div class="text-xs text-gray-400 ml-2 pt-1">{{ formatDate(forumProps.date) }}
                                </div>
                            </div>
                            <div class="ml-4  text-sm">
                                <div> {{ forumProps.content.text }}</div>
                            </div>
                            <div class="ml-4  text-sm my-2" v-if="forumProps.content && forumProps.content.photo">
                                <div class="cursor-pointer" @click="previewImage(forumProps.content.photo)">
                                    <img :src="forumProps.content.photo" class="w-20 h-20 rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End of original comment -->
                <div v-if="loadingComment">
                    <span>Loading...</span>
                </div>
                <div v-else class="pl-3 overflow-y-scroll" :style="{ maxHeight: `${windowHeight / 2}px` }">
                    <div v-for="(forum, index) in comments" :key="index">
                        <div class="flex mb-5">
                            <div class="flex items-start">
                                <div class="w-12 h-12">
                                    <div class="w-12 h-12 rounded-full bg-center bg-cover bg-custom flex-1"
                                        :style="{ backgroundImage: `url(${forum.user.photo})` }">
                                    </div>
                                </div>
                                <div>
                                    <div class="ml-4 flex items-center">
                                        <div class="text-sm font-semibold">{{ forum.user.name }}</div>
                                        <div class="text-xs text-gray-400 ml-2 pt-1">{{ formatDate(forum.date) }}
                                        </div>
                                    </div>
                                    <div class="ml-4  text-sm">
                                        <div> {{ forum.content.text }}</div>
                                    </div>
                                    <div class="ml-4  text-sm my-2" v-if="forum.content && forum.content.photo">
                                        <div class="cursor-pointer" @click="previewImage(forum.content.photo)">
                                            <img :src="forum.content.photo" class="w-20 h-20 rounded-md" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CloseIcon from '../../../components/CloseIcon.vue'
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
    components: { CloseIcon },
    props: {
        forumProps: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data() {
        return {
            windowHeight: window.innerHeight
        }
    },
    computed: {
        ...mapState('forum', ["comments", "loadingComment"]),
    },

    methods: {
        ...mapActions('forum', ['showComment']),
        onClose() {
            this.$emit("onClose")
        },

        formatDate(date) {
            moment.locale("en");
            return moment(date).format("DD-MM-YYYY");
        },
    },

    mounted() {
        this.showComment({ forum_id: this.forumProps._id })
    }
}
</script>