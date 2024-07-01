<template>
    <div class="flex items-center justify-center mt-5 flex-col">
        <div class="border rounded py-2 px-3  rounded-full italic text-sm">The message was deleted by <b>{{chat.sender.name}}</b></div>
        <p class="text-lg text-right opacity-40 mb-1 text-gray-700 ml-2" style="font-size: 11px">
            {{ getDay(chat.date) }}
        </p>

    </div>
</template>
<script>
import helper from "../../../helper/helper";
import moment from "moment";
export default {
    props: {
        chat: {},
    },
    methods: {
        getDay(oldDate) {
            if (helper.numDay(oldDate, moment().format()) === 0) {
                return moment(oldDate).format("h:mm:ss");
            }
            return moment(oldDate).format("DD-MM-YYYY");
        },
    }
}
</script>