<template>
    <div class="fixed w-full h-full left-0 top-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        <div class="relative bg-white rounded-xl max-w-sm w-96">
            <div class="h-8 w-8 bg-red-500 rounded-full cursor-pointer flex items-center justify-center absolute -right-4 -top-4"
                @click="closeMessage">
                <CloseIcon fill="#fff" />
            </div>
            <div>
                <div class="w-full h-10 flex items-center justify-center border-b font-bold text-sm">Confirm Delete
                </div>
                <div class="p-5">
                    <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                    <div class="flex justify-end border-t mt-5">
                        <button @click="ConfirmDelete"
                            class="bg-red-500 text-white rounded-full text-sm outline-none focus:outline-none px-3 py-1 mt-5">
                            <span v-if="isDeleting">Processing...</span>
                            <span v-else>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CloseIcon from '../../../components/CloseIcon.vue'
export default {
    components: { CloseIcon },
    props: {
        message: {
            type: String,
            default: () => {
                return 'តើអ្នកចង់លុបវាមែនទេ?'
            }
        },
        size: {
            type: Number,
            default: () => {
                return 60;
            }
        },
        isDeleting: {
            type: Boolean,
            default: () => {
                return false;
            }
        }
    },
    methods: {
        closeMessage($event) {
            this.$emit("closeMessage", $event);
        },

        ConfirmDelete($event) {
            this.$emit("ConfirmDeleteCart", $event);
        }
    }
}
</script>