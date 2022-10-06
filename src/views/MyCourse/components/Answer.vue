<template>
    <div class="font-khmer_os">
        <div class="fixed inset-0 overflow-y-auto" style="z-index: 51">
            <div class="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div class="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle"
                     :class="`w-${width}`" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div class="header flex justify-between items-center p-4 border border-gray-200 border-t-0 border-l-0 border-r-0 text-sm font-khmer_os">

                        <div class="text-left w-full font-semibold text-sm text-center">
                            {{title}}
                        </div>
                        <div class="cursor-pointer" @click="closeAnswer">
                            <CloseIcon :width="20" :height="20"></CloseIcon>
                        </div>
                    </div>
                    <div class="body bg-white">
                        <!--List comment-->
                        <div class="h-105 overflow-y-scroll"
                             :class="loadingComment?'flex items-center justify-center':''"
                             ref="feed" @scroll="onScroll">
                            <loading v-if="loadingComment"></loading>
                            <div v-else>
                                <ul>
                                    <li class="flex-cols justify-start items-center px-4 py-3 bg-gray-50 text-13px">
                                        <div class="flex items-center">
                                            <div class="w-10 h-10 shadow rounded-full bg-center"
                                                 :style="{backgroundImage:`url(${comment.user.photo})`,backgroundSize:`cover`}">
                                            </div>
                                            <div class="ml-3">
                                                <strong>{{comment.user.name}}</strong>
                                                <div class="text-gray-400 text-13px">{{formatDate(comment.date)}}</div>
                                            </div>
                                        </div>
                                        <div v-if="comment.content.photo" class="ml-14 mt-2">
                                            <div class="h-20 flex justify-between items-start">
                                                <img :src="comment.content.photo"
                                                     class="max-h-full rounded w-auto cursor-pointer"
                                                     @click="showFullImage(comment.content.photo)">
                                            </div>
                                        </div>
                                        <div v-if="comment.content.text" class="ml-12 mt-1 p-2">
                                            <p class="whitespace-pre-wrap">{{comment.content.text}}</p>
                                        </div>
                                    </li>
                                </ul>
                                <ul v-if="comments && comments.length">
                                    <li v-for="(forum, key) in comments" :key="key"
                                        class="text-13px flex-cols justify-start items-center px-4 py-2 border-4 border-b-0 border-l-0 border-r-0 border-gray-200">
                                        <div class="flex items-center">
                                            <div class="w-10 h-10 shadow rounded-full bg-center"
                                                 :style="{backgroundImage:`url(${forum.user.photo})`,backgroundSize:`cover`}">
                                            </div>
                                            <div class="ml-3">
                                                <strong>{{forum.user.name}}</strong>
                                                <div class="text-gray-400 text-13px">{{formatDate(forum.date)}}</div>
                                            </div>
                                        </div>
                                        <div v-if="forum.content.photo" class="ml-12 mt-1">
                                            <div class="h-20 flex justify-between items-start">
                                                <img :src="forum.content.photo"
                                                     class="max-h-full rounded w-auto cursor-pointer"
                                                     @click="showFullImage(forum.content.photo)">
                                            </div>
                                        </div>
                                        <div v-if="forum.content.text" class="ml-12 mt-1 p-2">
                                            <p class="whitespace-pre-wrap">{{forum.content.text}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--Box comment-->
                        <div class="relative">
                            <!--Box preview image-->
                            <div class="h-20 m-5 flex  justify-between items-start absolute -top-32 w-full pr-10"
                                 v-if="imgPreview">
                                <img :src="imgPreview" class="max-h-full rounded w-auto">
                                <div class="bg-gray-300 rounded-full p-1 cursor-pointer hover:bg-gray-400"
                                     @click="removeImage">
                                    <CloseIcon :size="18"></CloseIcon>
                                </div>
                            </div>
                            <div class="flex px-5 mb-5">
                                <div class="w-10 h-10 shadow rounded-full bg-center"
                                     :class="stProfile?'bg-gray-300':''"
                                     :style="stProfile?{backgroundImage:`url(${stProfile.photo})`,backgroundSize:`cover`}:''">
                                </div>
                                <div class="flex pl-3 relative items-center flex-1">
                                    <textarea type="text"
                                              class="resize-none rounded-full bg-gray-200 focus:outline-none b-y-2 pl-12 pr-20 w-full h-10 font-khmer_os text-sm pt-3"
                                              placeholder="បញ្ចេញមតិ..." v-model="message"
                                              ref="text"></textarea>
                                    <div class="absolute left-6 cursor-pointer" @click="chooseCommentPhoto">
                                        <ImageIcon :size="30"></ImageIcon>
                                    </div>
                                    <div class="transform rotate-45 absolute right-4 cursor-pointer"
                                         v-if="(message || imgPreview)" @click="submit">
                                        <SendMessageIcon></SendMessageIcon>
                                    </div>
                                    <form>
                                        <input type="file" name="photo" ref="comment_photo" class="hidden"
                                               @change="FileChange"
                                               accept="image/x-png,image/gif,image/jpeg">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ImgFull v-if="fullImage" :Url="photo" @hideFullImage="hideFullImage"></ImgFull>
    </div>
</template>
<script>
    import {mapActions, mapState} from "vuex"
    import CloseIcon from "./../components/CloseIcon"
    import ImageIcon from "./../../../components/ImageIcon"
    import SendMessageIcon from "./../../../components/SendMessageIcon"
    //    import helper from "./../../../helper/helper"
    import moment from "moment"
    import Loading from "./../../../components/Loading"
    import ImgFull from "./../../Discuss/components/ImgFull"
    export default{
        components: {
            CloseIcon,
            Loading,
            ImageIcon,
            ImgFull,
            SendMessageIcon
        },
        data(){
            return {
                stProfile: localStorage.getItem('stProfile') ? JSON.parse(localStorage.getItem('stProfile')) : "",
                photo: "",
                imgPreview: "",
                message: "",
                fullImage: false,
                page: 1,
            }
        },
        props: {
            title: {
                default: () => {
                    return ""
                }
            },
            width: {
                default: () => {
                    return '100'
                }
            },
            comment: {
                default: () => {
                    return {}
                }
            }
        },
        computed: {
            ...mapState('forum', ['comments', 'loadingComment'])
        },
        methods: {
            ...mapActions('forum', ['showComment', 'addComment', 'showCommentPagination']),
            closeAnswer(){
                this.$emit("closeAnswer")
            },
            showFullImage(photoUrl){
                this.photo = photoUrl
                this.fullImage = true
            },
            hideFullImage(){
                this.photo = ""
                this.fullImage = false
            },
            removeImage(){
                this.photo = ""
                this.imgPreview = ""
            },

            chooseCommentPhoto(){
                this.$refs.comment_photo.click()
            },
            formatDate(date){
                moment.locale('en');
                return moment(date).format('DD-MM-YYYY');
            },
            submit(){
                if (this.message.trim() || this.imgPreview) {

                    let formData = new FormData();
                    formData.append("forum_id", this.comment._id);
                    formData.append("text", this.message);
                    formData.append("photo", this.photo);
                    this.addComment(formData).then(() => {
                        this.message = ""
                        this.scrollToBottom()
                    })
                    this.removeImage()
                }
            },
            scrollToBottom()
            {
                setTimeout(() => {
                    try {
                        this.$refs.feed.scrollTop = this.$refs.feed.scrollHeight - this.$refs.feed.clientHeight
                        this.pageOffsetTop = 1
                    } catch (err) {
                        return err
                    }
                }, 50)
            },
            onScroll ({target: {scrollTop, clientHeight, scrollHeight}}) {
                if (scrollTop + clientHeight >= scrollHeight) {
                    this.page++

                    let params = {
                        forum_id: this.comment._id,
                        p: this.page,
                        s: ""
                    }
                    this.showCommentPagination(params)
                }
            },
            FileChange(e)
            {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                this.photo = e.target.files[0]
                reader.onloadend = () => {
                    this.imgPreview = reader.result;
                }
                this.$refs.text.focus()
            },
        },
        created(){
            let params = {
                forum_id: this.comment._id,
                p: this.page
            }
            this.showComment(params)
        }
    }
</script>
<style>
    textarea {
        resize: none;
    }
</style>