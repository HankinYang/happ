<template>
  <a-layout>
    <a-layout-content>
      <a-result
        status="404"
        title="404"
        sub-title="对不起，这里离火星还很遥远......"
      >
        <template #extra>
          <a-button type="primary"> Back Home </a-button>
        </template>
      </a-result>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style>
</style>