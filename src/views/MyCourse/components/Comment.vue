<template>
    <div>
        <PostComment :lesson_id="lesson_id" />
        <div v-for="(forum, index) in forums" :key="index">
            <div class="flex mb-5" v-if="!isDeleted(forum._id)">
                <div class="flex items-start w-full">
                    <div class="w-14 h-14">
                        <div class="w-14 h-14 rounded-full bg-center bg-cover bg-custom flex-1"
                            :style="{ backgroundImage: `url(${forum.user.photo})` }">
                        </div>
                    </div>
                    <div class="w-full">
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
                                <img :src="forum.content.photo" class="w-20 h-20 rounded-md object-cover" />
                            </div>
                        </div>
                        <div class="ml-4">
                            <ViewComment v-if="forum.comment" :forum="forum" />
                            <div class="flex mb-3 text-xs text-custom font-semibold">

                                <div class=" mt-1 cursor-pointer" @click="showReply(forum)">
                                    Reply
                                </div>

                                <div class=" mt-1 cursor-pointer pl-5" @click="editComment(forum)"
                                    v-if="stProfile._id == forum.user._id && !forum.content.photo">
                                    Edit
                                </div>

                                <div class="text-red-600 mt-1 cursor-pointer pl-5"
                                    v-if="stProfile._id == forum.user._id" @click="confirmDelete(forum)">
                                    Delete
                                </div>
                            </div>
                            <ReplyComment :forum_id="forum._id" v-if="forumId == forum._id"
                                @onReplySuccess="onReplySuccess" :caption="text" :isEdit="isEdit" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-if="isModal" :imgUrl="imgUrl" @closeModal="isModal = false" />
        <ConfirmDelete v-if="isConfirm" @closeMessage="isConfirm = false" @ConfirmDeleteCart="ConfirmDeleteCart"
            :isDeleting="isLoading" />

    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import PostComment from './PostComment.vue';
import ReplyComment from './ReplyComment.vue';
import ViewComment from './ViewComment.vue';
import Modal from './Modal.vue';
import ConfirmDelete from './ConfirmDelete.vue';


export default {
    components: { PostComment, Modal, ViewComment, ReplyComment, ConfirmDelete },
    data() {
        return {
            isModal: false,
            imgUrl: "",
            forumId: null,
            isConfirm: false,
            isLoading: false,
            forumDeleted: [],
            text: "",
            isEdit: false,

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
        ...mapState("auth", ["stProfile"]),

    },

    methods: {
        ...mapActions("forum", ["getForum", "addForum", "getForumPagination", "deleteForum"]),
        isDeleted(forumId) {
            return this.forumDeleted.includes(forumId);
        },

        confirmDelete(forum) {
            this.forumId = forum._id;
            this.isConfirm = true;
        },
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

        },
        showReply(forum) {
            this.forumId = forum._id;
            this.isEdit = false;
            this.text = ""
        },

        async ConfirmDeleteCart() {
            this.isLoading = true;
            await this.deleteForum(this.forumId)
            this.isLoading = false;
            this.isConfirm = false;
            this.forumDeleted.push(this.forumId);
        },

        editComment(forum) {
            this.isEdit = true;
            this.forumId = forum._id;
            this.text = forum.content.text;
        }
    },

    mounted() {
        this.fetchingForums();
    }
}
</script>