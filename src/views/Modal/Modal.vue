<template>
  <div
    class="
      flex
      items-center
      justify-center
      fixed
      left-0
      top-0
      z-50
      bg-black bg-opacity-80
      w-full
      h-full
    "
    id="dismiss"
    @click="dismiss"
    style="z-index: 70"
  >
    <div :class="width">
      <div :class="`shadow ${radius} bg-white overflow-x-hidden`">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "Modal",
  props: {
    radius: {
      default: () => "rounded-xl",
    },
    width: {
      default: () => "w-1/2",
    },
  },

  methods: {
    dismiss(event) {
      if (event.target.id == "dismiss") {
        this.$emit("dismiss", true);
      }
    },
  },
};
</script>
