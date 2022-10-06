<template>
    <div class="flex-cols">
        <div class="flex items-center">
            <div class="w-14 h-14 rounded-full bg-center"
                 :style="{backgroundImage:`url(${chat.sender.photo})`,backgroundSize:`cover`}">

            </div>
            <div>
                <h3 class="font-khmer_os text-sm text-gray-900 ml-2">{{chat.sender.name}}</h3>
                <p class="text-lg  opacity-40 mb-2 text-gray-700 ml-2" style="font-size:11px;">
                    {{getDay(chat.date)}}
                </p>
            </div>
        </div>
        <div class="flex items-center justify-start p-2">
            <div class="w-10">&nbsp;</div>
            <div class="chat text-left w-1/2">
                <div class="float-left bg-gray-200 break-all px-2 py-1"
                     :class="stringLength(chat.content.value) > 50?'rounded-2xl':'rounded-full '"
                     v-html="mention(chat.content.value)"
                     v-if="chat.content.type === 1"
                >
                </div>
                <ImageView :chat="chat" v-if="chat.content.type === 2"></ImageView>
                <img v-if="chat.content.type === 2">
                <Audio :chat="chat" v-if="chat.content.type === 3"></Audio>

            </div>
        </div>

    </div>
</template>
<script>
    import helper from "./../../../helper/helper"
    import moment from "moment"
    import Audio from "./Audio"
    import ImageView from "./Image"
    export default{
        name: "MediaLeft",
        components: {
            Audio,
            ImageView
        },
        props: {
            chat: {}
        },
        methods: {
            getDay(oldDate){
                if (helper.numDay(oldDate, moment().format()) === 0) {
                    return moment(oldDate).format('h:mm:ss')
                } else {
                    return moment(oldDate).format('DD-MM-YYYY')
                }
            },
            stringLength(string){
                return string.length
            },
            mention(str) {
                return str.replace(/[@]\[/g, "<span class='text-blue-500'>").replace(/\]/g, "</span>")
            },
        }
    }
</script>