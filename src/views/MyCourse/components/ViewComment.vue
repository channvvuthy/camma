<template>
    <div>
        <div class="text-blue-500 text-xs mt-2 cursor-pointer" @click="showCommentDetail">View Comment({{ forum.comment }})
        </div>
        <CommentDetail v-if="isDetail" @onClose="isDetail = false" :forumProps="forum" />
    </div>
</template>
<script>
import CommentDetail from "./CommentDetail.vue";
export default {
    components: { CommentDetail },
    props: {
        forum: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },

    data() {
        return {
            isDetail: false,
        }
    },

    methods: {
        showCommentDetail() {
            this.isDetail = true;
        }
    },
}
</script>