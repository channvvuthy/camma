<template>
  <div class="bg-white h-screen py-5">
    <div class="
        px-5
        font-khmer_os
        text-14px
        flex-cols
        justify-center
        items-center
        text-center
        w-full
      ">
      <div class="
          bg-cover bg-center
          w-24
          h-24
          rounded-full
          flex
          justify-center
          items-center
          m-auto
          cursor-pointer
          mb-2
          relative
          photo
        " :style="{
          backgroundSize: 'cover',
          backgroundImage: `url(${user.photo})`,
        }" @click="changePhoto">
        <div class="
            camera
            absolute
            bg-gray-100
            rounded-full
            w-8
            h-8
            justify-center
            items-center
            flex
            bottom-0
            right-0
          ">
          <CameraIcon />
        </div>
        <div class="loader" v-if="updatingPhoto">
          <Loader />
        </div>
      </div>
      <p class="mb-5">{{ "0" + user.phone }}</p>
      <form>
        <input type="file" style="display: none" ref="image" name="image" @change="onFileChange"
          accept="image/x-png,image/gif,image/jpeg" />
      </form>
      <div class="flex items-center border-b h-12 mb-3">
        <EditUserIcon />
        <input type="text" v-bind:value="user.first_name" class="ml-3 h-full w-full border-none outline-none"
          placeholder="នាមត្រកូល" />
      </div>

      <div class="flex items-center border-b h-12 mb-3">
        <EditUserIcon />
        <input type="text" v-bind:value="user.last_name" class="ml-3 h-full w-full border-none outline-none"
          placeholder="នាមខ្លួន" />
      </div>

      <div class="flex items-center border-b h-12 mb-3">
        <div class="flex items-center cursor-pointer">
          <div class="flex items-center">
            <div class="h-4 w-4 rounded-full border border-custom mr-4 flex items-center justify-center">
              <div v-if="user.gender == 'M'" class="h-3 w-3 rounded-full border bg-custom"></div>
            </div>
            <div>Male</div>
          </div>
        </div>

        <div class="ml-5 flex items-center cursor-pointer">
          <div class="flex items-center">
            <div class="h-4 w-4 rounded-full border border-custom mr-4">
              <div v-if="user.gender == 'F'" class="h-3 w-3 rounded-full border bg-custom"></div>
            </div>
            <div>Female</div>

          </div>
        </div>
      </div>

      <div class="flex items-center border-b h-12 mb-3">
        <BranchIcon />
        <input type="text" v-bind:value="user.province ? user.province.name : ''"
          class="ml-3 h-full w-full border-none outline-none" placeholder="សាខា" />
      </div>

      <div class="flex items-center border-b h-12 mb-3">
        <MapIcon />
        <input type="text" v-bind:value="user.school ? user.school.name : ''" class="ml-3 h-full w-full border-none outline-none"
          placeholder="នាយកដ្ឋាន" />
      </div>

      <div class="flex items-center border-b h-12 mb-3">
        <PositionIcon />
        <input type="text" class="ml-3 h-full w-full border-none outline-none"
          placeholder="មុខតំណែង" />
      </div>
    </div>
  </div>
</template>

<script>
import EditUserIcon from "./../../components/EditUserIcon";
import MapIcon from "./../../components/MapIcon";
import { mapActions, mapState } from "vuex";
import CameraIcon from "./../../components/CameraIcon";
import Loader from "./../../components/Loader";
import BranchIcon from "./components/BranchIcon";
import PositionIcon from "./components/PositionIcon";

export default {
  name: "Profile",
  components: {
    CameraIcon,
    EditUserIcon,
    MapIcon,
    PositionIcon,
    Loader,
    BranchIcon,
  },
  data() {
    return {
      image: null,
      err: false,
      errMessage: null,
      loading: false,
      showProvince: false,
      showSchool: false,
      user: {},
    };
  },
  computed: {
    ...mapState("setting", [
      "provinces",
      "schools",
      "loadingProvince",
      "loadingSchool",
    ]),
    ...mapState("auth", ["stProfile", "updatingPhoto"]),
  },
  methods: {
    ...mapActions("setting", ["getProvinces", "getSchool"]),
    ...mapActions("auth", [
      "changeProfile",
      "getStudentProfile",
      "changeProfilePhotoPhoto",
    ]),

    closeProvince() {
      this.showProvince = false;
    },

    closeSchool() {
      this.showSchool = false;
    },

    changePhoto() {
      this.$refs.image.click();
    },

    showAllProvince() {
      this.stProfile.school.name = null;
      this.showProvince = true;
    },
    updateProfile() {
      if (!this.stProfile.first_name) {
        this.err = true;
        this.errMessage = "សូមបញ្ចូលនាមត្រកូល";
        return false;
      }
      if (!this.stProfile.last_name) {
        this.err = true;
        this.errMessage = "សូមបញ្ចូលនាមខ្លួន";
        return false;
      }
      if (!this.stProfile.province) {
        this.err = true;
        this.errMessage = "សូមជ្រើសរើសខេត្ត";
        return false;
      }
      if (!this.stProfile.first_name) {
        this.err = true;
        this.errMessage = "សូមជ្រើរើសសាលា";
        return false;
      }

      this.loading = true;

      let user = {
        last_name: this.stProfile.last_name,
        first_name: this.stProfile.first_name,
        gender: this.stProfile.gender,
        date_of_birth: this.stProfile.date_of_birth,
        school: {
          _id: this.stProfile.school._id,
          name: this.stProfile.school.name,
        },
        province: {
          _id: this.stProfile.province._id,
          name: this.stProfile.province.name,
        },
      };

      this.changeProfile(user)
        .then(() => {
          this.loading = false;
          this.err = true;
          this.errMessage = "ពត៍មានត្រូវបានកែប្រែជោគជ័យ";

          this.getStudentProfile(this.stProfile);
          localStorage.setItem("stProfile", JSON.stringify(this.stProfile));
        })
        .catch(() => {
          this.err = true;
          this.errMessage = "ការកែប្រែពត៍មានត្រូវបានបរាជ័យ";
          this.loading = false;
        });
    },
    closeMessage() {
      this.err = false;
    },

    changeGender(gender) {
      this.stProfile.gender = gender;
    },
    selectProvince(province) {
      this.getSchool(province._id).then(() => {
        this.showProvince = false;
        this.stProfile.province = province;
      });
    },
    showAllSchool() {
      if (!this.schools.length || this.loadingSchool) {
        return false;
      }
      this.showSchool = true;
    },
    selectSchool(school) {
      this.showSchool = false;
      this.stProfile.school = school;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.stProfile.photo = URL.createObjectURL(file);
      this.image = this.$refs.image.files[0];

      let formData = new FormData();

      formData.append("image", e.target.files[0]);

      this.changeProfilePhotoPhoto(formData)
        .then((response) => {
          this.stProfile.photo = response.data.photo;
          this.getStudentProfile(this.stProfile);
          localStorage.setItem("stProfile", JSON.stringify(this.stProfile));
        })
        .catch(() => {
          console.log("err");
        });
    },
  },

  created() {
    this.getProvinces();
    this.user = this.stProfile
  },
};
</script>

<style>
.camera {
  visibility: hidden;
}

.photo:hover .camera {
  transition: 0.5s linear;
  visibility: visible;
}
</style>