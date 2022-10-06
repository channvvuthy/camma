<template>
    <div class="fixed z-50 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle"
                 :class="`w-${size}`" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-white py-5 pl-5 relative">
                    <div class="absolute right-0 top-0 mt-2 mr-2 cursor-pointer opacity-50" @click="closeProvince">
                        <CloseIcon :width="15" :height="15"></CloseIcon>
                    </div>
                    <div class="flex justify-left">
                        <div class="text-sm text-black text-sm font-khmer_os flex-1"
                             style="height: 70vh;overflow-y: scroll">
                            <div v-for="(province, key) in provinces" :key="key" class="mb-3 cursor-pointer"
                                 @click="selectProvince(province)">
                                {{province.name}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import helper from "./../../../helper/helper"
    import CloseIcon from "./../../../components/CloseIcon"
    export default{
        name: "Province",
        components: {
            CloseIcon
        },
        props: {
            provinces: {},
            size: {
                type: Number,
                default: () => {
                    return 56;
                }
            },
            hide: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
        },
        computed: {
            gender(){
                return helper.gender()
            }
        },
        methods: {
            closeProvince(){
                this.$emit("closeProvince")
            },
            selectProvince(province){
                this.$emit('selectProvince', province)
            },
            closeMessage($event){
                this.$emit("closeMessage", $event);
            },

            showCart($event){
                this.$emit("showCart", $event);
            }
        }
    }
</script>

<style scoped>
    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        width: 5px;
    }

    ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
        width: 5px;
    }
</style>