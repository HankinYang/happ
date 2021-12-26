<template>
  <a-layout>
    <a-layout-sider
      :width="sider.leftSideWidth"
      :collapsed="sider.isCollapsed"
      collapsible
    >
      <siderNav :list="sider.nav" mode="inline" @click="navClick" />
    </a-layout-sider>
    <a-layout-content>
      <a-tabs
        :activeKey="tab.activeKey"
        hide-add
        type="editable-card"
        style="height: 100%; width: 100%"
        @edit="tab.remove"
        @change="tab.change"
      >
        <a-tab-pane
          v-for="tab in tab.tabs"
          :key="tab.id"
          :closable="tab.closable"
          style="height: 100%; width: 100%"
        >
          <template #tab>
            <span>
              <i class="iconfont icon-h-all" />
              {{ tab.title }}
            </span>
          </template>
          <!-- <template>  -->
          <!-- <div class="ant-tabs-content"> -->
          <pageAsyncComp v-if="tab.categroy=='page'" style="height: 100%; width: 100%" :params="tab.params" :contentComp="tab.page" @openTab="openTab"/>
          <!-- </div> -->

          <!-- </template> -->
        </a-tab-pane>
        <!-- <pageAsyncComp /> -->
      </a-tabs>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import siderNav from "../../components/happMenu";
import pageAsyncComp from "./components/pageAsyncComp";

import { getNavMenu } from "@/api/sys";

export default {
  components: {
    siderNav,
    pageAsyncComp,
  },
  setup() {
    var store = useStore();
    const sider = reactive({
      nav: [],
      leftSideWidth: computed(() => (store.state.sysStore.isFold ? 80 : 200)),
      isCollapsed: computed(() => store.state.sysStore.isFold),
    });

    var siderMenus = {};
    const curKey = computed(() => store.state.sysStore.currentKey);
    watch(curKey, (curKey) => {
      sider.nav = [];
      if (siderMenus[curKey]) {
        sider.nav = siderMenus[curKey];
      } else {
        getNavMenu(curKey).then((r) => {
          sider.nav = siderMenus[curKey] = r.data;
        });
      }
    });

    var tabDic = {};
    const tab = reactive({
      tabs: [{ id: 0, title: "tab1", ico: "icon-h-all", closable: false }],
      activeKey: "",
      addTab: (tabInfo) => {
        // console.log("tab add ->", tabInfo,tabDic[tabInfo.id]);
        if (!tabDic[tabInfo.id]) {
          tab.closable = true;
          tabInfo.params=tabInfo.params
          // tabInfo.params.id=tabInfo.id;
          // tabInfo.params.name=tabInfo.name;
          tabInfo.params.title=tabInfo.title;
          tab.tabs.push(tabInfo);
          tabDic[tabInfo.id] = tabInfo;
        }
        tab.activeKey = tabInfo.id;
      },
      remove: (key) => {
        var index = 0;
        tab.tabs.forEach((tab, i) => {
          if (tab.id == key) {
            index = i;
          }
        });
        delete tabDic[key]
        tab.tabs = tab.tabs.filter((t) => t.id !== key);
        if (tab.tabs.length == 0) tab.activeKey = 0;
        else if (tab.tabs[index] && index == 0)
          tab.activeKey = tab.tabs[index].id;
        else tab.activeKey = tab.tabs[index - 1].id;
      },
      change: (activeKey) => {
        tab.activeKey = activeKey;
      },
    });

    const navClick = ({ item }) => {
      //菜单点击事件
      var data = item.data;
      console.log(data)
      tab.addTab(data);
    };

    // function create(Component, props) {
    //   // 借鸡生蛋new Vue({render() {}}),在render中把Component作为根组件
    //   const vm = new Vue({
    //     // h是createElement函数，它可以返回虚拟dom
    //     render(h) {
    //       console.log(h(Component, { props }));

    //       // 将Component作为根组件渲染出来
    //       // h(标签名称或组件配置对象，传递属性、事件等，孩子元素)
    //       return h(Component, { props });
    //     },
    //   }).$mount(); // 挂载是为了把虚拟dom变成真实dom
    //   // 不挂载就没有真实dom
    //   // 手动追加至body
    //   // 挂载之后$el可以访问到真实dom
    //   document.body.appendChild(vm.$el);

    //   console.log(vm.$children);

    //   // 实例
    //   const comp = vm.$children[0];

    //   // 淘汰机制
    //   comp.remove = () => {
    //     // 删除dom
    //     document.body.removeChild(vm.$el);

    //     // 销毁组件
    //     vm.$destroy();
    //   };

    //   // 返回Component组件实例
    //   return comp;
    // }
    return {
      sider,
      navClick,
      tab,
      openTab:tab.addTab
    };
  },
};
</script>

<style scoped>
.ant-tabs >>> .ant-tabs-nav {
  margin: 0;
  background: #f0ecec;
}
.ant-tabs >>> .ant-tabs-content-holder {
  background: #fff;
}

.ant-tabs >>> .ant-tabs-content {
  height: 100%;
}
</style>