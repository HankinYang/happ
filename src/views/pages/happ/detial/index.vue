<template>
  <a-layout>
    <a-layout-header style="padding: 0; background: #fff">
      <operatorBar
        :operators="operator.menus"
        @menuClick="operator.menuClick"
      />
    </a-layout-header>
    <a-layout-content style="text-align: left">
      <hFieldGroup v-for="(fg, fgi) in fieldGroups.list" :key="fgi" :da="fg" @fieldChange="fieldChange" @fieldKeyup="fieldKeyup"/>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import hFieldGroup from "./components/hfieldGroup";
import operatorBar from "@/views/pages/components/operatorBar";
import { useRoute } from "vue-router";
// import { getAppOperators } from "@/api/sys";
import { GetAppFramework } from "@/api/happ";


export default {
  components: {
    operatorBar,
    hFieldGroup,
  },
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          soruce: "router",
          name: "", //app的名称 用于加载app的框架信息
          mode: "", //app的状态 如 新增|修改|预览
        };
      },
    },
  },
  setup(props, ctx) {
    // console.log('detial',props.params);
    //判断是内部组件调用 还是通过route调用
    if (props.params.soruce && props.params.soruce == "router") {
      let route = useRoute();
      console.log(route.query);
      props.params.name = route.query.name;
      props.params.mode = route.query.mode;
    }
    const operator = reactive({
      menus: [],
      menuClick(menu) {
        console.log(menu,fieldGroups.list)
        var data={};
        fieldGroups.list.forEach(g=>{
          g.fields.forEach(f=>{
            data[f.name]=f.val;
          })
        })
        console.log(menu,data)
      },
    });

    const fieldGroups = reactive({
      list: [],
    });

    const fieldChange=(e)=>{
      console.log('field change->',e)
    }
    const fieldKeyup=(e)=>{
      console.log('field keyup->',e)
    }

    var init = () => {
      // getAppOperators().then((r) => {
      //   operator.menus = r.data;
      // });
      //处理不同mode的显示和操作
      var handles={
        add(){
          operator.menus=operator.menus.filter(e=>e.name!='add'&&e.name!='edit'&&e.name!='copy')
        },
        prev(){
          operator.menus=operator.menus.filter(e=>e.name!='save')
          fieldGroups.list.forEach(g=>{
            g.fields.forEach(f=>{
              f.showInfo.disabled=true;
            })
          })
        },
        edit(){
          operator.menus=operator.menus.filter(e=>e.name!='edit')
        }
      }
      //获取app的框架信息，字段 操作菜单
      GetAppFramework(props.params).then((r) => {
        r.data.fieldGroups.forEach((el) => {
          el.isFold = false;
        });
        fieldGroups.list = r.data.fieldGroups;
        operator.menus = r.data.operators;
        handles[props.params.mode.toLocaleLowerCase()]();
      });
    };
    init();
    return {
      operator,
      fieldGroups,
      fieldChange,
      fieldKeyup
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