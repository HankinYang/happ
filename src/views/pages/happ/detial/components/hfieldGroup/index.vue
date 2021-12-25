<template>
  <a-card :title="da.title" style="" :bodyStyle="bodyStyle">
    <template #extra><i :class="['iconfont',foldIco]" style="cursor:pointer;" @click="isFold=!isFold"></i></template>
    <div class="card-body" v-show="!isFold">
      hello
    </div>
  </a-card>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
export default {
  props: {
    da: {
      type: Object,
      default: () => {
        return {
          id: "",
          title: "",
        };
      },
    },
  },
  setup(props) {
    console.log(props);

    let isFold = false;
    const bodyStyle = computed(() => {
      return isFold ? {} : { padding: 0 };
    });
    const foldIco=computed(()=>{
      return isFold?'icon-h-arrow-up':'icon-h-arrow-down'
    })
    return {
      isFold,
      bodyStyle,
      foldIco
    };
  },
};
</script>

<style>
</style>