<template>
    <div class="fixed z-50 inset-0 overflow-y-auto font-khmer_os">
        <div class="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle w-100"
                 role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-white">
                    <div class="flex justify-between items-center bg-black text-white py-3 px-4">
                        <div class="text-sm">Downloading...</div>
                    </div>
                    <div class="px-4 py-5">
                        <div class="meter">
                            <span class="w-full"></span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import config from "./../config"
    export default{
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
<style>
    .meter {
        box-sizing: content-box;
        height: 10px; /* Can be anything */
        position: relative;
        box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
    }

    .meter > span {
        display: block;
        height: 100%;
        background-color: rgb(41, 201, 215);
        background-image: linear-gradient(center bottom, rgb(0, 146, 214) 37%, rgb(41, 201, 215) 69%
        );
        box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
        inset 0 -2px 6px rgba(0, 0, 0, 0.4);
        position: relative;
        overflow: hidden;
    }

    .meter > span:after,
    .animate > span > span {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-image: linear-gradient(
                -45deg,
                rgba(255, 255, 255, 0.2) 25%,
                transparent 25%,
                transparent 50%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0.2) 75%,
                transparent 75%,
                transparent
        );
        z-index: 1;
        background-size: 50px 50px;
        animation: move 2s linear infinite;
        overflow: hidden;
    }

    .animate > span:after {
        display: none;
    }

    @keyframes move {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 50px 50px;
        }
    }

    /*.loading-bar{*/
    /*height: 10px;*/
    /*width: 100%;*/
    /*position: relative;*/

    /*}*/
    /*.loading-bar:after{*/
    /*width:0%;*/
    /*height:100%;*/
    /*background-color: #27ddff;*/
    /*content: "";*/
    /*position: absolute;*/
    /*left:0;*/
    /*top:0;*/
    /*animation: w 5s ease infinite;*/
    /*}*/
    /*@keyframes w {*/
    /*0% {*/
    /*width:0%;*/
    /*}*/
    /*10% {*/
    /*width:10%;*/
    /*}*/
    /*20% {*/
    /*width:20%;*/
    /*}*/
    /*30% {*/
    /*width:30%;*/
    /*}*/
    /*40% {*/
    /*width:40%;*/
    /*}*/
    /*50% {*/
    /*width:50%;*/
    /*}*/
    /*60% {*/
    /*width:60%;*/
    /*}*/
    /*70% {*/
    /*width:70%;*/
    /*}*/
    /*80% {*/
    /*width:90%;*/
    /*}*/
    /*90% {*/
    /*width:90%;*/
    /*}*/
    /*100% {*/
    /*width:100%;*/
    /*}*/
    /*}*/
</style>