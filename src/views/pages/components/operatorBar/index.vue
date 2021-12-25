<template>
  <operatorMenu :theme="'light'" :list="operators" class="operatorbar" @click="menuClick"/>
</template>

<script>
import operatorMenu from "../../../components/happMenu";
import { reactive } from "vue";
// import

export default {
  components: {
    operatorMenu,
  },
  props: {
    operators: {
      type: Array,
      default: () => [],
    },
    businessData: {
      type: Object,
      default: undefined,
    },
  },
  setup(props,ctx) {
    // const menu = reactive({
    //   data: [
    //     // { id: 23, key: 23, 'title': '查询', 'url': 'http://192.168.1.100:9999', ico: "icon-h-all", },
    //     {
    //       id: 1,
    //       key: 1,
    //       title: "保存",
    //       url: "http://192.168.1.100:9999",
    //       ico: "icon-h-all",
    //       children: [
    //         {
    //           id: 11,
    //           key: 11,
    //           title: "保存",
    //           categroy: "page",
    //           page: "sets/system/menu",
    //           ico: "icon-h-all",
    //         },
    //         {
    //           id: 12,
    //           key: 12,
    //           title: "暂存",
    //           categroy: "page",
    //           page: "sets/system/pars",
    //           ico: "icon-h-all",
    //         },
    //       ],
    //     },
    //     {
    //       id: 2,
    //       key: 2,
    //       title: "提交",
    //       url: "http://192.168.1.100:9999",
    //       ico: "icon-h-all",
    //       children: [
    //         {
    //           id: 22,
    //           key: 22,
    //           title: "提交",
    //           url: "http://192.168.1.100:9999",
    //           ico: "icon-h-all",
    //         },
    //         {
    //           id: 24,
    //           key: 24,
    //           title: "撤回",
    //           url: "http://192.168.1.100:9999",
    //           ico: "icon-h-all",
    //         },
    //       ],
    //     },
    //     {
    //       id: 3,
    //       key: 3,
    //       title: "审核",
    //       url: "http://192.168.1.100:9999",
    //       ico: "icon-h-all",
    //       children: [
    //         {
    //           id: 32,
    //           key: 32,
    //           title: "审核",
    //           url: "http://192.168.1.100:9999",
    //           ico: "icon-h-all",
    //         },
    //         {
    //           id: 34,
    //           key: 34,
    //           title: "反审核",
    //           url: "http://192.168.1.100:9999",
    //           ico: "icon-h-all",
    //         },
    //       ],
    //     },
    //     {
    //       id: 4,
    //       key: 4,
    //       title: "作废",
    //       url: "http://192.168.1.100:9999",
    //       ico: "icon-h-all",
    //       children: [
    //         {
    //           id: 42,
    //           key: 42,
    //           title: "作废",
    //           url: "http://192.168.1.100:9999",
    //           ico: "icon-h-all",
    //         },
    //         {
    //           id: 44,
    //           key: 44,
    //           title: "反作废",
    //           url: "http://192.168.1.100:9999",
    //           ico: "icon-h-all",
    //         },
    //       ],
    //     },
    //   ],
    // });
    const menuClick=(data)=>{
        ctx.emit('menuClick',data.item.data.action);
    }
    return {
        menuClick
    };
  },
};
</script>

<style lang="scss" scoped>
.operatorbar {
  padding: 0;
}
</style>