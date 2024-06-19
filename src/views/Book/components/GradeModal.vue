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
        <li class="cursor-pointer" @click="gradeSelected('all')">
          <div class="border-b flex px-5 py-4">
            <div class="w-4 h-4 rounded-full border border-custom flex items-center justify-center">
              <div v-if="gradeID == ''" class="bg-custom h-3 w-3 rounded-full"></div>
            </div>
            <div class="w-2"></div>
            <div>ទាំងអស់</div>
          </div>
        </li>
        <li v-for="(grade, index) in courses.grade" :key="index" class="cursor-pointer" @click="gradeSelected(grade)">
          <div :class="{ 'border-b': index < courses.grade.length - 1 }" class="flex px-5 py-4 items-center">
            <div class="w-4 h-4 rounded-full border border-custom flex items-center justify-center">
              <div v-if="gradeID == grade._id" class="bg-custom h-3 w-3 rounded-full"></div>
            </div>
            <div class="w-2"></div>
            <div>{{ grade.name }}</div>
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
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState("course", ["courses", "gradeID"]),
  },
  methods: {
    gradeSelected(grade) {
      this.$emit("gradeSelected", grade);
    },
    closeModal() {
      this.$emit("closeModal", true);
    },
  },
};
</script>
