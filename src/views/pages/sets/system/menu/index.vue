<template>
  <hLayOut @openTab="openTab" />
</template>

<script>
import hLayOut from "@/views/pages/components/listlayout";

export default {
  components: {
    hLayOut,
  },
  setup(props, ctx) {
    const openTab = (params) => {
      ctx.emit("openTab", params);
    };

    return { openTab };
  },
};
</script>

<style>
</style>