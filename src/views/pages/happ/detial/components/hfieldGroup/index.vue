<template>
  <a-card :title="da.title" style="" :bodyStyle="state.bodyStyle">
    <template #extra
      ><i
        :class="['iconfont', state.foldIco]"
        style="cursor: pointer"
        @click="toggole"
      ></i
    ></template>
    <div class="card-body" v-show="!state.isFold">
      <hfield v-for="(f,fi) in da.fields" :key="fi" :da="f" />
    </div>
  </a-card>
</template>

<script>
import { ref,computed, reactive,  } from "@vue/reactivity";
import hfield from '../hfield'
export default {
  props: {
    da: {
      type: Object,
      default: () => {
        return {
          id: "",
          title: "",
          fields: [],
        };
      },
    },
  },
  components:{
    hfield
  },
  setup(props) {
    // console.log(props.da);
    props.da.fields.sort((a,b)=>a.seq-b.seq)
    const state = reactive({
      isFold: false,
      foldIco: computed(() => {
        return state.isFold ? "icon-h-arrow-up" : "icon-h-arrow-down";
      }),
      bodyStyle: computed(() => {
        return !state.isFold ? { padding: "10px" } : { padding: 0 };
      }),
    });
    const toggole = () => {
      state.isFold = !state.isFold;
    };

    return {
      state,
      toggole,
    };
  },
};
</script>

<style lang="scss">

</style>