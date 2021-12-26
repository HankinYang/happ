<template>
  <a-layout>
    <a-layout-header
      class="list_head"
      style="padding-bottom: 10px; background: #fff"
    >
      <a-row>
        <a-col :span="24" style="text-align: right">
          <operatorBar :operators="menuBar.menus" @menuClick="menuClick" />
        </a-col>
      </a-row>
      <!-- 过滤方案列表 -->
      <a-row>
        <a-col :span="2">过滤方案</a-col>
        <a-col :span="22">
          <a-tag :color="c.color" v-for="(c, ci) in search.cases" :key="ci">
            {{ c.label }}
          </a-tag>
        </a-col>
      </a-row>
      <!-- 简单过滤面版 -->
      <a-row>
        <a-col :span="2">过滤</a-col>
        <a-col :span="22" style="position: relative">
          <searchItem
            :fields="search.fields"
            :idx="search.conditions[0].idx"
            style="margin: 0 24px"
            @updateCondition="updateCondition"
          />
          <!-- {{search.conditions[0].idx}} -->
          <a-button
            type="primary"
            shape="circle"
            style="margin-right: 10px"
            @click="search.clickFold"
          >
            <template #icon>
              <i :class="['iconfont', search.folodIco]"></i>
            </template>
          </a-button>
          <a-button type="primary" @click="Search">
            <template #icon>
              <i class="iconfont icon-h-search"></i>
            </template>
            查询
          </a-button>
          <a-card
            class="other_search"
            :bordered="false"
            v-show="!search.isFold"
          >
            <p v-for="(s, si) in search.otherConditions" :key="si">
              <searchItem
                :fields="search.fields"
                :idx="s.idx"
                @updateCondition="updateCondition"
              />
              <a-button
                v-if="si == search.otherConditions.length - 1"
                type="primary"
                shape="circle"
                style="margin-left: 24px"
                @click="search.addCondition"
              >
                <template #icon>
                  <i :class="['iconfont', 'icon-h-add-select']"></i>
                </template>
              </a-button>
            </p>
          </a-card>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <happTable :query="search.query" @updateTableData="updateTableData" />
    </a-layout-content>
  </a-layout>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import operatorBar from "../../components/operatorBar";
import searchItem from "../../components/searchItem";
import happTable from "../../components/happTable";
import * as utils from '@/utils'

import {
  getAppSearchFields,
  getListFilterCases,
  getListOperators,
} from "@/api/sys";
import { http } from "@/api/http.js";
import axios from "axios";

export default {
  props: {
    params: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    operatorBar,
    searchItem,
    happTable,
  },
  setup(props, ctx) {
    console.log('list.params',props.params)
    var search = reactive({
      query: {}, //查询条件
      cases: [], //保存的查询方案
      isFold: true,
      fields: [], //该列表搜索可选择的字段
      conditions: [{ idx: "idx-" + 0 }, { idx: "idx-" + 1 }],
      //展开面板中的查询条件
      otherConditions: computed(() => {
        return search.conditions.filter((v, i) => i > 0);
      }),
      folodIco: computed(() => {
        return search.isFold ? "icon-h-falling" : "icon-h-rising";
      }),
      //折叠查询面板
      clickFold() {
        search.isFold = !search.isFold;
      },
      //添加查询条件
      addCondition() {
        search.conditions.push({
          idx: "idx-" + search.conditions.length,
        });
      },
      //加载数据
      loadData() {
        //获取查询字段
        getAppSearchFields(props.params).then((r) => {
          search.fields = r.data;
        });
        //获取查询方案
        getListFilterCases(props.params).then((r) => {
          search.cases = r.data;
          search.cases.forEach((el) => {
            var color = "#87d068";
            switch (el.category) {
              case "default":
                color = "#108ee9";
                break;
              case "public":
                color = "#2db7f5";
                break;
            }
            el.color = color;
          });
        });
      },
    });
    //更新查询条件
    const updateCondition = (val) => {
      search.conditions.forEach((el, i) => {
        if (el.idx == val.idx) {
          if (val.isOk) search.conditions[i] = val;
          else search.conditions[i] = { idx: val.idx };
        } else {
        }
      });
    };
    //查询
    const Search = () => {
      //   console.log(search.conditions);
      search.isFold = true;
      var queryConditions = [];
      search.conditions.forEach((k) => {
        if (k.field)
          queryConditions.push({
            fieldName: k.field.name,
            compare: k.compare.value,
            val: k.val,
            logic: k.logic,
          });
      });
      search.query.conditions = queryConditions;
      console.log("查询 动作->", queryConditions);
    };
    search.loadData();

    // 表格数据
    let tableData = [];
    const updateTableData = (data) => {
      tableData = data;
      console.log(data);
    };
    const menuBar = reactive({
      menus: [],
    });
    const menuClick = (action) => {
      console.log(
        "菜单调用-> action ->" + action.category + action.url,
        action,
        "action data->",
        tableData
      );
      try {
        switch (action.category) {
          case "postApi":
            // console.log(http)
            http
              .post(action.url, tableData)
              .then((r) => {
                console.log(r);
              })
              .error((r) => {
                console.log(r);
              });
            break;
          case "openTab":
            ctx.emit("openTab", {
              id: utils.uuid(),
              title: action.title+' '+ props.params.title,
              params:{
                action:action,
                ...props.params
              },
              categroy: "page",
              page: "happ/detial",
            });
            break;
          default:
            break;
        }
      } catch (error) {}
    };

    getListOperators(props.params).then((r) => {
      menuBar.menus = r.data;
    });
    return {
      search,
      Search,
      updateCondition,
      menuBar,
      menuClick,
      updateTableData,
    };
  },
};
</script>


<style lang="scss" scoped>
.ant-layout-header {
  padding: 0;
  // height:36px;
  line-height: 36px;
  z-index: 2;
}
.ant-menu-dark.ant-menu-submenu-popup {
  transform: translateY(-7px);
}
.ant-col {
  background: #fff;
  text-align: left;
}
.list_head {
  height: auto;
}
.other_search {
  position: absolute;
  height: auto;
  margin-top: 10px;
}
</style>