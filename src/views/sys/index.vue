<template>
  <a-layout>
    <a-layout-header style="color: #fff; overflow: hidden">
      <a-layout style="background: none">
        <a-layout-sider
          :width="head.leftSideWidth"
          style="text-align: left; padding: 5px"
          >logos</a-layout-sider
        >
        <a-layout-content>
          <a-row>
            <a-col :span="1" @click="toggleCollapsed">
              <i
                :class="['iconfont', head.foldIco]"
                style="font-size: 24px; cursor: pointer"
              ></i>
            </a-col>
            <a-col :span="15">
              <headNav :list="head.nav" @click="navClick" />
            </a-col>
            <a-col>
              <a-input-search
                style="vertical-align: middle"
                v-model:value="head.searchVal"
                placeholder="输入关键字查询..."
                size="large"
                autosize="true"
                enter-button
                @search="onSearch"
              />
            </a-col>
            <a-col :span="3" style="text-align: right; padding-right: 5px">
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  <a-avatar v-if="head.userInfo.avatarCategory == 'str'">{{
                    head.userInfo.avatar
                  }}</a-avatar>
                  <a-avatar
                    v-else-if="head.userInfo.avatarCategory == 'img'"
                    :src="head.userInfo.avatar"
                  />
                  {{ head.userInfo.name }}
                </a>
                <template #overlay>
                  <a-menu theme="dark">
                    <a-menu-item>{{ head.userInfo.dept }}</a-menu-item>
                    <a-menu-item>{{ head.userInfo.title }}</a-menu-item>
                    <a-sub-menu key="sub2" :title="head.lanTitle" >
                      <a-menu-item @click="head.changeLanguage(lan)" v-for="lan in head.languages" :key="'lan-'+lan.id">{{lan.title}}</a-menu-item>
                    </a-sub-menu>
                    <a-menu-divider />
                    <a-menu-item @click="quit">退出</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout-header>
    <a-layout-content>
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import headNav from "../components/happMenu";

import { getHeaderNav,getLanguages } from "@/api/sys";

export default {
  components: {
    headNav,
  },
  setup() {
    var store = useStore();
    // console.log(store.state.sysStore.isFold);
    const head = reactive({
      nav: [],
      leftSideWidth: computed(() => {
        return store.state.sysStore.isFold ? 80 : 200;
      }),
      foldIco: computed(() => {
        return store.state.sysStore.isFold ? "icon-h-zhankai" : "icon-h-shouqi";
      }),
      userInfo: computed(() => store.state.sysStore.userInfo),
      languages:[],
      lanTitle:computed(()=>store.state.sysStore.currentLanguage.title?store.state.sysStore.currentLanguage.title:'请选择语言'),
      changeLanguage:(lan)=>{
        store.commit('changeLanguage',lan);
      },
      searchVal: "",
    });
    getLanguages().then(r=>{
      head.languages=r.data;
    })
    getHeaderNav().then((r) => {
    //   console.log(r);
      head.nav = r.data;
      if(head.nav.length){
          store.commit('setCurrentKey',head.nav[0].key);
      }
    });
    const toggleCollapsed = () => {
      store.commit("toggleCollapsed");
    };
    const navClick = ({ key }) => {
      store.commit('setCurrentKey',key);
    };

    const quit = () => {
      console.log("quit ");
    };
    const onSearch = () => {
      console.log("onSearch");
    };
    return {
      head,
      toggleCollapsed,
      navClick,
      onSearch,
      quit,
    };
  },
};
</script>

<style  scoped>
.ant-layout {
  width: 100%;
  height: 100%;
}
.ant-layout-header {
  padding: 0;
}
.ant-col >>> .ant-menu-dark .ant-menu-item,
.ant-col >>> .ant-menu-dark .ant-menu-item-group-title,
.ant-col >>> .ant-menu-dark .ant-menu-item > a,
.ant-col >>> .ant-menu-dark .ant-menu-item > span > a {
  color: #fff;
}
</style>