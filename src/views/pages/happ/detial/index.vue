<template>
  <a-layout>
    <a-layout-header style="padding: 0; background: #fff">
      <operatorBar
        :operators="operator.menus"
        @menuClick="operator.menuClick"
      />
    </a-layout-header>
    <a-layout-content style="text-align: left">
      <hFieldGroup v-for="(fg,fgi) in fieldGroups.list" :key="fgi" :da="fg" />
    </a-layout-content>
  </a-layout>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import hFieldGroup from './components/hfieldGroup'
import operatorBar from "@/views/pages/components/operatorBar";
// import { getAppOperators } from "@/api/sys";
import {GetAppFramework} from '@/api/happ'

export default {
  components: {
    operatorBar,
    hFieldGroup
  },
  props: {
    params: {
      type: Object,
      default: () => {
        return {
        name:'',//app的名称 用于加载app的框架信息
        mode:'',//app的状态 如 新增|修改|预览
      }
      },
    },
  },
  setup(props) {
    console.log('detial',props.params);
    const operator = reactive({
      menus: [],
      menuClick() {},
    });

    const fieldGroups=reactive({
        list:[]
    })

    var init = () => {
      // getAppOperators().then((r) => {
      //   operator.menus = r.data;
      // });
      GetAppFramework(props.params).then(r=>{
          r.data.fieldGroups.forEach(el=>{
              el.isFold=false;
          })
          fieldGroups.list=r.data.fieldGroups;
          operator.menus=r.data.operators;
      })
    };
    init();
    return {
      operator,
      fieldGroups,
    };
  },
};
</script>

<style lang="scss">
.ant-layout-header {
  padding: 0;
  height: 36px;
  line-height: 36px;
  z-index: 2;
}
.ant-menu-dark.ant-menu-submenu-popup {
  transform: translateY(-7px);
}
</style>