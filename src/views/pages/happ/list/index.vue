<template>
  <hLayOut :params="params" />
</template>

<script>
import hLayOut from "@/views/pages/components/listlayout";

export default {
  props: {
    params: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    hLayOut,
  },
};
</script>

<style>
</style>