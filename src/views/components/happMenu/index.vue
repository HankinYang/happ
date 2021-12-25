<template>
  <a-menu
  :class="[cusClass]"
    v-model:selectedKeys="selectedKeys"
    :mode="mode"
    theme="dark"
  >
    <template v-for="item in list" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key" :data="item" >
          <template #icon>
            <!-- <PieChartOutlined /> -->
            <span>
              <span :class="['iconfont', item.ico]"></span>
            </span>
          </template>
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :key="item.key" :menu-info="item" />
      </template>
    </template>
  </a-menu>
</template>
<script>
import { defineComponent, ref } from "vue";


// you can rewrite it to a single file component, if not, you should config vue alias to vue/dist/vue.esm-bundler.js
const SubMenu = {
  name: "SubMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  template: `
    <a-sub-menu :key="menuInfo.key">
      <template #icon>
        <span>
            <span :class="['iconfont', menuInfo.ico]"></span>
        </span>
      </template>
      <template #title>{{ menuInfo.title }}</template>
      <template v-for="item in menuInfo.children" :key="item.key" >
        <template v-if="!item.children">
          <a-menu-item :key="item.key" :data="item">
            <template #icon>
              <span>
                <span :class="['iconfont', item.ico]"></span>
              </span>
            </template>
            {{ item.title }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.key" />
        </template>
      </template>
    </a-sub-menu>
  `,
  
};
// const list = [
//   {
//     key: "1",
//     title: "Option 1",
//     ico: "icon-h-all",
//   },
//   {
//     key: "2",
//     title: "Navigation 2",
//     ico: "icon-h-all",
//     children: [
//       {
//         key: "2.1",
//         title: "Navigation 3",
//         ico: "icon-h-all",
//         children: [{ key: "2.1.1", title: "Option 2.1.1" }],
//       },
//     ],
//   },
// ];
export default defineComponent({
  components: {
    "sub-menu": SubMenu,
  },
  props:{
      list:{
          type:Array,
          default:()=>[]
      },
      mode:{
          type:String,
          default:()=>'horizontal'
      },
      collapsed:{
          type:Boolean,
          default:()=>false
      },
      cusClass:{
        type:String,
        default:''
      }
      
  },
  setup(props) {
      const selectedKeys =ref([]);
      const openKeys=ref([]);
    if(props.list.length>0){
        var k=props.list[0].key;
        selectedKeys.value.push(k)
        openKeys.value.push(k)
    }
    return {
      selectedKeys,
      openKeys,
    };
  },
});
</script>

