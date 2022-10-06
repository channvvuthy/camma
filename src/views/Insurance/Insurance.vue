<template>
    <div class="px-5 bg-white font-khmer_os text-sm h-screen py-5">
        <div v-if="checkingInsurance"  class="flex justify-center items-center h-screen relative -top-5">
            <h1 class="text-sm font-semibold font-khmer_os relative -top-10">
                <loading></loading>
            </h1>
        </div>
        <div class="w-1/2 leading-6" v-else>
            <div v-if="insuranceStatus === 0">
                <p>
                    សូមធ្វើការទិញវគ្គសិក្សាចាប់ពី ៤មុខវីជ្ជាឡើងទៅទើបអាចទទួលបានសេវាកម្មធានារ៉ាប់រងដែលមានតម្លៃស្មើរនឹង ១០,០០០,០០រៀល(ដប់លានរៀល)</p>
            </div>
            <div v-if="insuranceStatus===1">
                <div class="flex  items-center">
                    <div class="mr-3">
                        <GotInsuranceIcon fill="#1fb141"></GotInsuranceIcon>
                    </div>
                    <div>
                        <div class="font-khmer_os text-md font-semibold">សូមអបអរសាទរ</div>
                        <div class="text-red-600 font-semibold text-md">
                            {{userInsurance.first_name}} {{userInsurance.last_name}}
                        </div>
                    </div>
                </div>
                <div class="mt-10 leading-6">
                    ដោយសារលោកអ្នកបានទិញវគ្គសិក្សាជាមួយ <span class="text-blue-900">CAMMA Microfinance&nbsp;</span><span
                        class="text-red-600">Cam</span><span class="text-blue-900">bodia</span>
                    ចំនួនបួនមុខវិជ្ជាក្នុងខែតែមួយ ដូច្នេះលោកអ្នកទទួលបាននូវសេវាកម្មធានារ៉ាប់រងអាយុជីវិតពីក្រុមហ៊ុន <span
                        class="text-red-600">Fort </span> <span class="text-green-400">Life </span>
                    ចំនួន១០,០០០,០០រៀល(ដប់លានរៀល)ដែលមានសុពលភាពគិតចាប់ពីពេលនេះរហូតដល់ថ្ងៃទី {{formatDate(userInsurance.expire_date)}}។ ព័ត៌មានលំអិត 090 787 999/ 023 885 007
                </div>
            </div>
            <div v-if="insuranceStatus === 2">
                <p class="mb-2 leading-6">
                    សូមបញ្ជាក់ព័ត៌មានមួយចំនួន ដើម្បីទទួលបានសេវាធានារ៉ាប់រងអាយុជីវិតដែលមានតម្លៃស្មើរនឹង ១០,០០០,០០រៀន(ដប់លានរៀល)</p>
                <div class="flex items-center">
                    <input type="text" class="flex-1 py-2 border border-gray-300 rounded pl-3 focus:outline-none"
                           placeholder="នាមត្រកូល" v-model="stProfile.first_name"/>
                    <label class="text-red-500 relative right-5">*</label>
                </div>
                <div class="flex items-center mt-2">
                    <input type="text" class="flex-1 py-2 border border-gray-300 rounded pl-3 focus:outline-none"
                           placeholder="នាមខ្លួន" v-model="stProfile.last_name"/>
                    <label class="text-red-500 relative right-5">*</label>
                </div>
                <div class="flex items-center mt-2">
                    <div class="flex mr-20">
                        <label>
                            <input type="radio" name="gender" value="M" :checked="stProfile.gender === 'M'"> ប្រុស
                        </label>
                    </div>
                    <div class="flex">
                        <label>
                            <input type="radio" name="gender" value="F" :checked="stProfile.gender === 'F'"> ស្រី
                        </label>
                    </div>
                </div>
                <div class="flex items-center mt-2">
                    <input type="text" class="flex-1 py-2 border border-gray-300 rounded pl-3 focus:outline-none"
                           placeholder="ថ្ងៃខែឆ្នាំកំណើត" onfocus="(this.type='date')"
                           v-model="stProfile.date_of_birth"/>
                    <label class="text-red-500 relative right-5">*</label>
                </div>
                <div class="flex items-center mt-2">
                    <input type="text" class="flex-1 py-2 border border-gray-300 rounded pl-3 focus:outline-none"
                           placeholder="លេខទូរស័ព្ទ" v-model="stProfile.phone"/>
                    <label class="text-red-500 relative right-5">*</label>
                </div>
                <div class="flex items-center mt-2">
                    <input type="text"
                           class="flex-1 py-2 border border-gray-300 rounded pl-3 focus:outline-none cursor-pointer"
                           placeholder="ខេត្ត" v-model="stProfile.province.name" readonly @click="showAllProvince"/>
                    <label class="text-red-500 relative right-5">*</label>
                </div>
                <div class="flex items-center mt-2 relative">
                    <input type="text"
                           class="flex-1 py-2 border border-gray-300 rounded pl-3 focus:outline-none cursor-pointer"
                           placeholder="វិទ្យាល័យ" v-model="stProfile.school.name" readonly @click="showAllSchool"/>
                    <label class="text-red-500 relative right-5">*</label>
                    <img src="/ajax-loader.gif" class="absolute right-10 top-0 mt-3" v-if="loadingSchool"/>
                </div>
                <div class="parent border border-gray-300 rounded px-5 pb-4 mt-5 relative">
                    <div class="absolute w-full text-center -top-3">
                        <span class="bg-white">ព័ត៌មានអាណាព្យាបាល</span>
                    </div>
                    <div class="flex items-center mt-3">
                        <input type="text"
                               class="flex-1 py-1 border border-gray-300 border-t-0 border-l-0 border-r-0  focus:outline-none"
                               placeholder="លេខទូរស័ព្ទ" v-model="yourGuardian.phone"/>
                        <label class="text-red-500 ">*</label>
                    </div>
                    <div class="flex items-center mt-3">
                        <input type="text"
                               class="flex-1 py-1 border border-gray-300 border-t-0 border-l-0 border-r-0 focus:outline-none"
                               placeholder="ត្រូវជា" v-model="yourGuardian.type"/>
                        <label class="text-red-500">*</label>
                    </div>
                </div>
                <p class="mt-2">
                    សូមចុចលើពាក្យថា យល់ព្រម លោកអ្នកត្រូវប្រាកដថាព័ត៌មាន ដែលផ្តល់មកគឺត្រឹមត្រូវដូចទៅនឹង សំបុត្រកំណើត ឬអត្តសញ្ញាណប័ណ្ណរបស់អ្នក។
                </p>
                <div class="flex justify-end items-center" @click="confirm">
                    <button class="bg-custom py-2 px-5 focus:outline-none hover:bg-opacity-80 text-white rounded"
                            :disabled="loadingConfirm">
                        យល់ព្រម
                        <Loader :size="10" v-if="loadingConfirm"></Loader>
                    </button>

                </div>

            </div>
        </div>
        <Message v-if="err" :message="message" @closeMessage="closeMessage"></Message>
        <Province v-if="showProvince" :provinces="provinces" @selectProvince="selectProvince"
                  @closeProvince="closeProvince"></Province>
        <School v-if="showSchool" :schools="schools" @selectSchool="selectSchool"
                @closeSchool="closeSchool"></School>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex"
    import Message from "./../Auth/components/Message"
    import Loader from "./../../components/Loader"
    import Province from "./../Profile/components/Province"
    import School from "./../Profile/components/School"
    import GotInsuranceIcon from "./../../components/GotInsuranceIcon"
    import moment from "moment"
    import Loading from "./../../components/Loading"
    export default{
        name: "Insurance",
        components: {
            Message,
            Loader,
            Province,
            School,
            Loading,
            GotInsuranceIcon
        },
        data(){
            return {
                showProvince: false,
                showSchool: false,
                err: false,
                message: "",
                yourGuardian: {
                    phone: "",
                    type: ""
                }
            }
        },
        computed: {
            ...mapState('insurance', ['insuranceStatus', 'checkingInsurance', 'loadingConfirm', 'userInsurance']),
            ...mapState('auth', ['stProfile']),
            ...mapState('guardian', ['guardians', 'loadingGuardian']),
            ...mapState('setting', ['provinces', 'schools', 'loadingProvince', 'loadingSchool']),

        },
        methods: {
            ...mapActions('insurance', ['checkInsurance', 'confirmInsurance']),
            ...mapActions('auth', ['getStudentProfile']),
            ...mapActions('guardian', ['getGuardian']),
            ...mapActions('setting', ['getProvinces', 'getSchool']),
            closeMessage(){
                this.err = false
            },
            showAllProvince(){
                this.stProfile.school.name = null
                this.showProvince = true
            },
            selectProvince(province)
            {
                this.getSchool(province._id).then(() => {
                    this.showProvince = false
                    this.stProfile.province = province
                })
            },
            formatDate(date){
                moment.locale('km');
                return moment(date).format('ll');
            },
            showAllSchool()
            {
                if (!this.schools.length || this.loadingSchool) {
                    return false
                }
                this.showSchool = true
            },
            closeProvince(){
                this.showProvince = false
            },
            closeSchool(){
                this.showSchool = false
            },
            selectSchool(school)
            {

                this.showSchool = false
                this.stProfile.school = school

            },
            confirm(){
                if (this.stProfile.first_name === "") {
                    this.err = true
                    this.message = "សូមបញ្ចូលនាមត្រកូល"
                    return

                }
                if (this.stProfile.last_name === "") {
                    this.err = true
                    this.message = "សូមបញ្ចូលនាមខ្លួន"
                    return
                }
                if (this.stProfile.phone === "") {
                    this.err = true
                    this.message = "សូមបញ្ចូលលេខទូរស័ព្ទ"
                    return
                }
                if (this.stProfile.date_of_birth === "") {
                    this.err = true
                    this.message = "សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើត"
                    return
                }
                if (this.stProfile.province._id === "") {
                    this.err = true
                    this.message = "សូមជ្រើសរើសខេត្ត"
                    return
                }
                if (this.stProfile.school._id === "") {
                    this.err = true
                    this.message = "សូមជ្រើសរើសសាលា"
                    return
                }
                if (this.yourGuardian.phone === "") {
                    this.err = true
                    this.message = "សូមបញ្ចូលលេខទូរស័ព្ទអាណាព្យាបាល"
                    return
                } else {
                    this.stProfile.guardian_phone = this.yourGuardian.phone
                }
                if (this.yourGuardian.type === "") {
                    this.err = true
                    this.message = "សូមបញ្ជាក់ពីតួនាទីអាណាព្យាបាល"
                    return
                } else {
                    this.stProfile.type = this.yourGuardian.type
                }
                this.confirmInsurance(this.stProfile).then(response => {
                    if (response.data.status === 1) {
                        this.err = true
                        this.message = response.data.msg
                    } else {
                        this.checkInsurance()
                    }
                })
            }
        },
        created(){
            this.checkInsurance()
            this.getProvinces()
            this.getGuardian().then(response => {
                if (response.data.data && response.data.data.length) {
                    let theGuardian = response.data.data.map(item => item)[0]
                    this.yourGuardian.phone = theGuardian.phone
                    this.yourGuardian.type = theGuardian.type
                }
            })
        }
    }
</script>