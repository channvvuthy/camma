<template>
    <div class="fixed z-50 inset-0 overflow-y-auto font-khmer_os">
        <div class="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle w-100"
                 role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-white">
                    <div class="flex justify-between items-center bg-black text-white py-3 px-4">
                        <div class="text-sm">UPDATE AVAILABLE(v{{version}})</div>
                        <div class="cursor-pointer opacity-50 hover:opacity-100" @click="dimiss">
                            <CloseIcon fill="#ffffff"></CloseIcon>
                        </div>
                    </div>
                    <div class="px-4 py-5">
                        <h3><strong>CAMMA Microfinance  v{{version}}</strong></h3>
                        <li class="text-sm text-gray-700 mx-3 my-2">New version is available please update your app</li>
                    </div>
                    <div class="flex justify-end p-5">
                        <button class="bg-gray-200 text-gray-700 rounded focus:outline-none text-sm px-6 mr-3 h-10"
                                @click="dimiss">Dismiss
                        </button>
                        <button class="bg-custom text-white rounded focus:outline-none text-sm  px-6"
                                @click="updateVersion">Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CloseIcon from "./CloseIcon"
    import config from "./../config"
    export default{
        components: {
            CloseIcon
        },
        props: {
            version: {
                default: () => {
                    return config.appVersion
                }
            }
        },
        methods: {
            dimiss(){
                this.$emit("dismiss")
            },
            updateVersion(){
                this.$emit("updateVersion")
            }
        }
    }
</script>
