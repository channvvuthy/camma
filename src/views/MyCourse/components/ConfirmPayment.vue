<template>
    <div class="fixed z-40 inset-0 overflow-y-auto" @click="closeConfirmPayment">
        <div class="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="w-8/12 inline-block align-bottom  overflow-hidden  transform transition-all  sm:align-middle"
                 role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-white">
                    <div style="max-height: 80vh; overflow-y: scroll">
                        <iframe :srcdoc="html" class="w-full h-screen"></iframe>
                    </div>

                </div>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name: "TermAndCondition",
        props: {
            size: {
                type: Number,
                default: () => {
                    return 96;
                }
            },
            html: {
                type: String,
                default: () => {
                    return null
                }
            }
        },
        methods: {
            closeConfirmPayment(){
                this.$emit("closeConfirmPayment")
            }
        },
    }
</script>
