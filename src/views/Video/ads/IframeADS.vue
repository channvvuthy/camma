<template>
    <div class="fixed z-10 inset-0 overflow-y-auto font-khmer_os">
        <div class="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-opacity-0  overflow-hidden  transform transition-all  sm:align-middle  w-7/12"
                 role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="conten overflow-x-scroll">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: "IframeADS",
        props: {
            urlIframe: {
                type: String,
                default: () => {
                    return ""
                }
            }
        }
    }
</script>