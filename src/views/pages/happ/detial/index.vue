<template>
  <a-layout>
    <a-layout-header style="padding: 0; background: #fff">
      <operatorBar
        :operators="operator.menus"
        @menuClick="operator.menuClick"
      />
    </a-layout-header>
    <a-layout-content style="text-align: left">
      <hFieldGroup v-for="(fg,fgi) in fieldGroups" :key="fgi" :da="fg" />
    </a-layout-content>
  </a-layout>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import hFieldGroup from './components/hfieldGroup'
import operatorBar from "@/views/pages/components/operatorBar";
import { getAppOperators } from "@/api/sys";
import {GetAppFramework} from '@/api/happ'

export default {
  components: {
    operatorBar,
    hFieldGroup
  },
  props: {
    params: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    console.log(props.params);
    const operator = reactive({
      menus: [],
      menuClick() {},
    });

    const fieldGroups=reactive({
        list:[]
    })

    var init = () => {
      getAppOperators().then((r) => {
        operator.menus = r.data;
      });
      GetAppFramework({name:'language'}).then(r=>{
          r.data.fieldGroups.forEach(el=>{
              el.isFold=false;
          })
          fieldGroups.list=r.data.fieldGroups;
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