<template>
    <div>
        <div class="text-xl mb-5">មតិយោបល់</div>
        <PostComment :lesson_id="lesson_id" />
        <div v-for="(forum, index) in forums" :key="index">
            <div class="flex mb-5">
                <div class="flex items-start">
                    <div class="w-14 h-14">
                        <div class="w-14 h-14 rounded-full bg-center bg-cover bg-custom flex-1"
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
                        <div class="ml-4">
                            <ViewComment v-if="forum.comment" :forum="forum" />
                            <div class="text-xs text-custom font-semibold mt-1 cursor-pointer mb-5"
                                @click="forumId = forum._id">Reply</div>
                            <ReplyComment :forum_id="forum._id" v-if="forumId == forum._id"
                                @onReplySuccess="onReplySuccess" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-if="isModal" :imgUrl="imgUrl" @closeModal="isModal = false" />
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import PostComment from './PostComment.vue';
import ReplyComment from './ReplyComment.vue';
import ViewComment from './ViewComment.vue';
import Modal from './Modal.vue';


export default {
    components: { PostComment, Modal, ViewComment, ReplyComment },
    data() {
        return {
            isModal: false,
            imgUrl: "",
            forumId: null
        }
    },
    props: {
        lesson_id: {
            type: String,
            default: () => "",
        },
    },

    computed: {
        ...mapState("forum", ["forums", "loadingForum", "loadingForumPagination"]),
    },

    methods: {
        ...mapActions("forum", ["getForum", "addForum", "getForumPagination"]),
        fetchingForums() {
            let params = {
                lesson_id: this.lesson_id,
                p: "",
                s: "",
            };
            this.getForum(params);
        },
        onReplySuccess() {
            this.fetchingForums();
            this.forumId = null;
        },

        formatDate(date) {
            moment.locale("en");
            return moment(date).format("DD-MM-YYYY");
        },
        previewImage(imgUrl) {
            this.imgUrl = imgUrl;
            this.isModal = true;

        }
    },

    mounted() {
        this.fetchingForums();
    }
}
</script>