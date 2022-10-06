<template>
    <div class="bg-white h-screen py-2">
        <div class="px-5 font-khmer_os password-14px flex-cols justify-center items-center password-center w-96">
            <div>
                <input type="password" class="border border-gray-200 focus:outline-none mt-3 rounded p-2 w-full"
                       placeholder="ពាក្យសម្ងាត់បច្ចុប្បន្ន" v-model="oldPassword">
            </div>
            <div>
                <input type="password" class="border border-gray-200 focus:outline-none mt-5 rounded p-2 w-full"
                       placeholder="ពាក្យសម្ងាត់ថ្មី" v-model="newPassword">
            </div>
            <div>
                <input type="password" class="border border-gray-200 focus:outline-none mt-5 rounded p-2 w-full"
                       placeholder="ពាក្យសម្ងាត់ថ្មីម្ដងទៀត" v-model="confirmPassword">
            </div>

            <div class="flex justify-start items-center mt-5">
                <button
                        :disabled="userChangingPassword"
                        @click="changePassword"
                        class="text-14px flex justify-between items-center bg-custom h-11 px-3 rounded text-white focus:outline-none :hover-opacity-50 hover:bg-opacity-80">
                    <SaveIcon></SaveIcon>
                    <span class="pl-1">កែប្រែពាក្យសម្ងាត់</span><span v-if="userChangingPassword" class="ml-2"><Loader
                        :size="10"></Loader></span>
                </button>
            </div>
            <Message v-if="err" :message="errMessage" @closeMessage="closeMessage"></Message>
        </div>
    </div>
</template>

<script>
    import SaveIcon from "./../../components/SaveIcon"
    import Message from "./../../components/Message"
    import {mapState, mapActions} from "vuex"
    import Loader from "././../../components/Loader"
    export default{
        name: "Lock",
        components: {
            SaveIcon,
            Message,
            Loader
        },
        data(){
            return {
                oldPassword: null,
                newPassword: null,
                confirmPassword: null,
                err: false,
                errMessage: null
            }
        },
        computed: {
            ...mapState('auth', ['userChangingPassword'])
        },

        methods: {
            ...mapActions('auth', ['userChangePassword']),
            closeMessage(){
                this.err = false
            },
            changePassword(){
                if (!this.oldPassword) {
                    this.err = true
                    this.errMessage = "សូមបញ្ចូលពាក្យសម្ងាត់ចាស់"
                    return;
                }
                if (!this.newPassword) {
                    this.err = true
                    this.errMessage = "សូមបញ្ចូលពាក្យសម្ងាត់ថ្មី"
                    return
                }
                if (!this.confirmPassword) {
                    this.err = true
                    this.errMessage = "សូមបញ្ចូលពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់"
                    return
                }

                if (this.confirmPassword !== this.newPassword) {
                    this.err = true
                    this.errMessage = "ពាក្យសម្ងាត់ និងពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់មិនដូខគ្នា"
                    return
                }

                let params = {
                    old_password: this.oldPassword,
                    password: this.newPassword,
                    confirm_password: this.confirmPassword
                }

                this.userChangePassword(params).then(response => {
                    if (response.status === 0) {
                        this.err = true
                        this.errMessage = "ពាក្យសម្ងាត់ត្រូវបានកែប្រែជោគជ័យ"
                    } else {
                        this.err = true
                        this.errMessage = response.msg
                    }
                }).catch(err => {
                    this.err = true
                    this.errMessage = err.response.data.msg
                })
            }
        }
    }
</script>