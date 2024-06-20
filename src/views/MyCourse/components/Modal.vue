<template>
    <div class="flex items-center justify-center fixed w-full h-full bg-black bg-opacity-50 top-0 left-0 z-50">
        <div class="w-96 bg-white rounded-xl">
            <div class="flex items-center px-5 py-3 relative border-b">
                <div class="text-center font-semibold text-lg flex items-center justify-center w-full">
                    <span>Preview Image</span>
                </div>
                <div class="absolute w-8 h-8 rounded-full bg-custom cursor-pointer rounded-full flex items-center justify-center -right-5 -top-5"
                    @click="closeModal">
                    <CloseIcon :size="18" fill="#FFF" />
                </div>
            </div>
            <div class="p-5 overflow-y-scroll" style="max-height: 700px;">
                <img :src="imgUrl" class="max-w-full rounded-xl" />
            </div>
        </div>
    </div>
</template>
<script>
import CloseIcon from '../../../components/CloseIcon.vue'
export default {
    components: {
        CloseIcon
    },
    props: {
        imgUrl: {
            type: String,
            default: function () {
                return ""
            }
        }
    },
    methods: {
        closeModal() {
            this.$emit("closeModal");
        }
    }
}
</script>