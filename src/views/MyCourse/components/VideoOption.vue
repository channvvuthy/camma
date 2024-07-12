<template>
    <div class="flex items-center">
        <div class="rounded-full bg-gray-300 cursor-pointer px-4 py-1 text-sm relative"
            @click="toggleDropdown('speed')">
            <span>កំណត់ល្បឿន</span>
            <div class="absolute bg-black rounded-2xl -top-52 w-32 py-3 z-50 -left-5 dropdown" v-if="isSpeedRate">
                <ul>
                    <li @click="selectOption('speed', option)" v-for="option in speedOptions" :key="option"
                        class="text-gray-50 h-10 text-center flex items-center justify-center hover:bg-gray-500"
                        :class="`${getDefaultSpeedRate(option) ? 'bg-gray-500' : ''}`">
                        {{ option }}
                    </li>
                </ul>
                <div class="absolute transform rotate-90 -bottom-4 left-14">
                    <ArrowIcon />
                </div>
            </div>
        </div>
        <div class="w-5"></div>
        <div class="rounded-full bg-gray-300 cursor-pointer px-4 py-1 text-sm relative"
            @click="toggleDropdown('quality')">
            <span>កម្រិតរូបភាព</span>
            <div class="absolute bg-black rounded-2xl w-32 py-3 z-50 -left-5 dropdown" :class="[
                { '-top-40 -mt-2': qualityOptions.length == 3 },
                { '-top-52': qualityOptions.length == 4 },
                { '-top-60 -mt-2': qualityOptions.length == 5 }]" v-if="isQuality">
                <ul>
                    <li @click="selectOption('quality', option)" v-for="option in qualityOptions" :key="option"
                        class="text-gray-50 h-10 text-center flex items-center justify-center hover:bg-gray-500"
                        :class="`${getDefaultQuality(option) ? 'bg-gray-500' : ''}`">
                        {{ option }}
                    </li>
                </ul>
                <div class="absolute transform rotate-90 -bottom-4 left-14">
                    <ArrowIcon />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ArrowIcon from './ArrowIcon.vue';
import { mapState } from 'vuex';

export default {
    components: {
        ArrowIcon
    },
    props: {
        lesson_id: {
            type: String,
            default: function () {
                return ""
            }
        }
    },
    data() {
        return {
            isSpeedRate: false,
            isQuality: false,
            speedOptions: ['0.5x', '1x', '1.5x', '2x'],
            qualityOptions: ['240p', '360p', '540p', '720p']
        };
    },
    computed: {
        ...mapState("playVideo", ["defaultSpeedRate", "defaultQuality"]),
        ...mapState("course", ["courseDetail"]),
    },
    methods: {
        toggleDropdown(type) {
            if (type === 'speed') {
                this.isSpeedRate = !this.isSpeedRate;
                this.isQuality = false;
            } else if (type === 'quality') {
                this.isQuality = !this.isQuality;
                this.isSpeedRate = false;
            }
        },
        selectOption(type, option) {
            if (type == "speed") {
                this.$store.commit("playVideo/setDefaultSpeedRate", option);
            } else {
                this.$store.commit("playVideo/setDefaultQuality", option);
            }
        },

        getDefaultSpeedRate(speedRate) {
            return this.defaultSpeedRate == speedRate;
        },

        getDefaultQuality(quality) {
            return this.defaultQuality == quality;
        },

        setNumberViewOfVideo(videoId) {
            try {
                const video = this.courseDetail.list.filter((item) => item._id == videoId)[0]
                this.$store.commit("course/setNumberOfView", video.view)
            } catch (err) {
                return 0
            }
        },

        getLinks() {

            try {
                const video = this.courseDetail.list.filter((item) => item._id == this.lesson_id)[0]
                const videoMap = video.links.map((item) => item.rendition)
                if (videoMap) {
                    this.qualityOptions = videoMap;
                }
            } catch (err) {
                console.log({ err })
            }
        }
    },

    watch: {
        lesson_id: function (currentValue) {
            if (currentValue) {
                this.getLinks();
                this.setNumberViewOfVideo(currentValue);
            }
        }
    }
};
</script>