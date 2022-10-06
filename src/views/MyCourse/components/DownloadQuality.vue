<template>
    <div class="fixed z-50 inset-0 overflow-y-auto font-khmer_os">
        <div class="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle"
                 :class="`w-${size}`" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <ul class="bg-white shadow-md rounded">
                    <li class="border border-r-0 border-l-0 border-t-0 h-10 leading-10 text-gray-500 text-center cursor-pointer">
                        កំរិត
                    </li>
                    <li class="border border-r-0 border-l-0 border-t-0 h-10 leading-10 text-custom text-center cursor-pointer"
                        @click="qDownload(22)">720p
                    </li>
                    <li class="border border-r-0 border-l-0 border-t-0 h-10 leading-10 text-custom text-center cursor-pointer"
                        @click="qDownload(18)">360p
                    </li>
                    <li class="h-10 leading-10 text-red-500 text-center cursor-pointer" @click="closeQuality()">បោះបង់
                    </li>
                </ul>

            </div>
        </div>
    </div>


</template>
<script>
    export default{
        name: "DownloadQuality",
        props: {
            size: {
                default: () => {
                    return '56'
                }
            }
        },
        methods: {
            qDownload(q){
                this.$emit("downloadQuality", q)
            },
            closeQuality(){
                this.$emit("closeQuality")
            }
        }
    }
</script>