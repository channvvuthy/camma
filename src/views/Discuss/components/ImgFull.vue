<template>
    <div class="fixed inset-0 overflow-y-auto" style="z-index: 100">
        <div class="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true" @click="hideFullImage">
                <div class="absolute inset-0 bg-black"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-opacity-0 rounded text-left overflow-hidden  transform transition-all  sm:align-middle"
                 :class="`w-${size}`" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-opacity-0">
                    <div class="flex justify-center items-center relative py-8">
                        <div class="absolute -top-0 -right-1 cursor-pointer opacity-50 hover:opacity-70"
                             @click="hideFullImage" v-if="loadingImg">
                            <CloseIcon fill="#ffffff"></CloseIcon>
                        </div>
                        <img :src="Url" class="max-w-full" id="img" @load="loadedImage"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CloseIcon from "./../../../components/CloseIcon"
    export default{
        name: "ImgFull",
        components: {
            CloseIcon
        },
        props: {
            Url: {
                type: String,
                default: () => {
                    return ""
                }
            },
            size: {
                type: Number,
                default: () => {
                    return 96;
                }
            }
        },
        data(){
            return {
                phone: null,
                loadingImg: false
            }
        },
        methods: {
            closeMessage($event){
                this.$emit("closeMessage", $event);
            },
            hideFullImage(){
                this.$emit("hideFullImage")
            },

            loadedImage(){
                this.loadingImg = true
            }
        },
        created(){

        }
    }
</script>