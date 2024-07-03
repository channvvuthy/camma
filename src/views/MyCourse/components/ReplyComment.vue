<template>
    <div>
        <div class="flex items-center mb-5">
            <div class="w-12 h-12 ">
                <div class="w-12 h-12 flex-1 rounded-full bg-custom bg-center bg-cover"
                    :style="{ backgroundImage: `url(${profile.photo})` }">
                </div>
            </div>
            <div class="flex bg-white w-full rounded-full shadow ml-3 px-5 items-center">
                <input :placeholder="loadingAdd ? 'Processing...' : 'បញ្ចេញមតិយោបល់...'"
                    class="rounded-full py-2.5 text-sm outline-none border-none w-full" ref="text" v-model="text"
                    @keypress.enter="onComment" />
                <div class="opacity-70 cursor-pointer" @click="onExploreFile">
                    <CameraIcon />
                </div>
                <input type="file" name="photo" ref="photo" class="hidden" @change="onSelectedFile"
                    accept="image/x-png,image/gif,image/jpeg" />
                <div class="opacity-70 cursor-pointer ml-3" @click="onComment">
                    <SendIcon />
                </div>
            </div>
        </div>
        <div class="flex items-center justify-end relative" v-if="isImagePreview" @click="removeImage">
            <div
                class="absolute w-6 h-6 rounded-full bg-custom cursor-pointer -right-2 -top-3 flex items-center justify-center">
                <CloseIcon fill="#FFF" :size="18" />
            </div>
            <img :src="isImagePreview" class="w-20 h-20 rounded-md shadow" />
        </div>
    </div>
</template>
<script>
import CameraIcon from '../../../components/CameraIcon.vue'
import CloseIcon from './CloseIcon.vue';
import SendIcon from './SendIcon.vue'
import { mapActions, mapState } from 'vuex';
export default {
    components: {
        CameraIcon,
        SendIcon,
        CloseIcon
    },
    props: {
        forum_id: {
            type: String,
            default: function () {
                return ""
            }
        }
    },
    computed: {
        ...mapState('forum', ['loadingAdd']),
    },
    data() {
        return {
            profile: {},
            photo: "",
            isImagePreview: false,
            text: "",
        }
    },
    methods: {
        ...mapActions("forum", ["getForum", "addForum", "getForumPagination", "addComment"]),
        onComment() {
            if (!this.text.trim() && !this.photo) return;
            if (this.loadingAdd) return;

            let formData = new FormData();
            formData.append("forum_id", this.forum_id);
            formData.append("text", this.text);
            formData.append("photo", this.photo);

            this.addComment(formData);
            this.clearData();
            this.$emit("onReplySuccess")

        },
        clearData() {
            this.isImagePreview = "";
            this.$refs.photo.value = "";
            this.photo = "";
            this.text = "";
        },
        onExploreFile() {
            this.$refs.photo.click();
        },

        onSelectedFile(e) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            this.photo = e.target.files[0];
            reader.onloadend = () => {
                this.isImagePreview = reader.result;
            };
            this.$refs.text.focus();
        },

        removeImage() {
            this.$refs.photo.value = "";
            this.photo = "";
            this.isImagePreview = "";
        }
    },
    created() {
        const profile = localStorage.getItem("stProfile");
        this.profile = JSON.parse(profile);
    }
}
</script>