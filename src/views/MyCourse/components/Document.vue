<template>
    <div class="fixed z-50 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle"
                 :class="`w-${size}`" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-white font-khmer_os">
                    <!--Header-->
                    <div class="flex justify-between items-center p-3">
                        <div class="flex-1 text-center">
                            {{lessonTitle}}
                        </div>
                        <div class="flex">
                            <div class="cursor-pointer mr-5 opacity-60" @click="openFullscreen()"
                                 title="Full Screen Or Press Esc to Exit">
                                <FullScreenIcon :size="15"></FullScreenIcon>
                            </div>
                            <div class="cursor-pointer opacity-60 mr-3" @click="showListData">
                                <ListIcon :width="15" :height="15"></ListIcon>
                            </div>
                            <div class="cursor-pointer opacity-60 relative -top-1" @click="closeReading">
                                <CloseIcon :width="22" :height="22"></CloseIcon>
                            </div>
                        </div>

                    </div>
                    <hr>
                    <div class="h-90 flex justify-center items-center" v-if="loading">
                        <div>
                            <Loading></Loading>
                        </div>
                    </div>
                    <div id="fullScreen" class="h-85 relative" :class="!showList?`overflow-y-scroll`:``" v-else>
                        <ul class="absolute left-0 top-0 bg-white h-screen z-50 w-full" v-if="showList">
                            <li class="flex cursor-pointer text-13px border border-gray-200 border-t-0 border-l-0 border-r-0 py-3 px-3"
                                v-for="(book, key) in documents" :key="key" @click="readingCourse(book)">
                                <div class="mr-3">
                                    <template>
                                        <CheckIcon fill="#009e03" :width="20"
                                                   :height="20"></CheckIcon>
                                    </template>
                                </div>
                                <div>{{book.title}}</div>
                            </li>
                        </ul>
                        <div v-else>
                            <pdf v-for="i in numPages"
                                 :key="i"
                                 :src="pdfFile"
                                 @error="log"
                                 :page="i"></pdf>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import pdf  from 'vue-pdf'
    import CloseIcon from "./../../../components/CloseIcon"
    import ListIcon from "./../../../components/ListIcon"
    import CheckIcon from "./../../../components/CheckIcon"
    import Loading from "./../../../components/Loading"
    import FullScreenIcon from "./../../../components/FullScreenIcon"
    export default{
        name: "Document",
        components: {
            pdf,
            CloseIcon,
            ListIcon,
            FullScreenIcon,
            Loading,
            CheckIcon
        },
        props: {
            size: {
                type: String,
                default: () => {
                    return "2/5"
                }
            },
            lessonTitle: {
                default: () => {
                    return ""
                }
            },
            documents: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data(){
            return {
                window: {
                    width: 0,
                    height: 0
                },
                loading: false,
                pdfFile: "",
                oldPdf: "",
                numPages: undefined,
                showList: false,
                book: null
            }
        },
        beforeDestroy(){

        },
        destroyed(){

        },

        methods: {
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },

            log(err){
                console.log(err)
            },
            showListData(){
                this.showList = !this.showList
                if (!this.showList) {
                    this.readingCourse(this.book)
                }
            },
            closeReading(){
                this.$emit("closeReading")
            },
            openFullscreen() {
                var elem = document.getElementById("fullScreen");
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) { /* Safari */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE11 */
                    elem.msRequestFullscreen();
                }
            },
            readingCourse(book){

                this.loading = true

                this.$emit("setLessonTile", book.title)

                this.book = book

                let pdfFile = pdf.createLoadingTask(book.url);

                this.pdfFile = pdfFile


                this.pdfFile.promise.then(pdf => {
                    this.loading = false
                    this.numPages = pdf.numPages;

                })
                this.showList = false
            },

        },
        created(){
            this.loading = true
            window.addEventListener('resize', this.handleResize);
            this.handleResize();

            this.book = this.documents[0]

            let pdfFile = this.documents.map(items => items.url)[0]


            if (pdfFile === undefined) {
                this.loading = false
                return false
            }

            this.pdfFile = pdf.createLoadingTask(pdfFile);
            this.pdfFile.promise.then(pdf => {
                this.numPages = pdf.numPages;
                this.loading = false
            })

        }
    }
</script>