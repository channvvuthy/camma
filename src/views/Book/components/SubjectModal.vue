<template>
  <Modal width="w-100">
    <div class="font-khmer_os text-sm text-nav">
      <!-- Header -->
      <div class="h-12 flex items-center px-5 justify-between border-b">
        <div class="text-base text-gray-700">{{ moalTitle }}</div>
        <div class="cursor-pointer" @click="closeModal()">
          <CloseIcon />
        </div>
      </div>
      <!-- Body -->
      <ul class="h-100 overflow-y-scroll overflow-x-hidden">
        <li class="cursor-pointer" @click="subjectSelected('all')">
          <div class="border-b">
            <div class="flex px-5 py-3">
              <div class="w-4 h-4 rounded-full border border-custom flex items-center justify-center">
                <div class="bg-custom h-3 w-3 rounded-full" v-if="subjectId == 'all'"></div>
              </div>
              <div class="w-2"></div>
              <div>ទាំងអស់</div>
            </div>
          </div>
        </li>
        <li v-for="(grade, index) in subject" :key="index" class="cursor-pointer" @click="subjectSelected(grade)">
          <div :class="index < subject.length - 1 ? `border-b` : ``">
            <div class="flex px-5 py-3 items-center">
              <div class="w-4 h-4 rounded-full border border-custom flex items-center justify-center">
                <div class="bg-custom h-3 w-3 rounded-full" v-if="selectedSubjectId == grade._id"></div>
              </div>
              <div class="w-2"></div>
              <div>{{ grade.name }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </Modal>
</template>
<script>
import Modal from "../../Modal/Modal.vue";
import CloseIcon from "../../../components/CloseIcon.vue";
import { mapState } from "vuex";
export default {
  components: {
    Modal,
    CloseIcon,
  },
  props: {
    moalTitle: {
      default: function () {
        return "";
      },
    },
  },
  computed: {
    ...mapState("course", ["subject", "selectedSubjectId"]),
  },
  methods: {
    subjectSelected(grade) {
      this.$store.commit("course/setSubjectId", grade._id);
      this.$emit("subjectSelected", grade);
    },
    closeModal() {
      this.$emit("closeModal", true);
    },
  },
};
</script>