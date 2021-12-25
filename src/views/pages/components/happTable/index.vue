<template>
  <a-layout class="happ_table">
    <a-layout-content ref="container">
      <a-table
        :scroll="{ y: da.scrollY }"
        :row-selection="rowSelection"
        :columns="da.columns"
        :data-source="da.data"
        :pagination="false"
        @change="onChange"
        @resizeColumn="da.handleResizeColumn"
        :row-class-name="
          (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
        "
        :loading="da.loading"
      >
      </a-table>
    </a-layout-content>
    <a-layout-footer>
      <a-pagination
        v-model:current="da.curPage"
        :page-size-options="da.pageSizeOptions"
        :total="da.totalCount"
        show-size-changer
        :page-size="da.pageSize"
        :show-total="(total, range) => `${range[0]}-${range[1]} / ${total} 条`"
        @change="da.onPageChange"
        @showSizeChange="da.onShowSizeChange"
      >
        <template #buildOptionText="props">
          <span v-if="props.value !== da.totalCount+''">{{ props.value }}条/页</span>
          <span v-else>全部</span>
        </template>
      </a-pagination>
    </a-layout-footer>
  </a-layout>
</template>
<script >
// import type { TableColumnType, TableProps } from 'ant-design-vue';
import {
  defineComponent,
  reactive,
  computed,
  ref,
  onMounted,
  watch,
} from "vue";
import { Table } from "ant-design-vue";
import { getListColumns, getListEgData } from "@/api/sys";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ["descend", "ascend"],
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];
export default defineComponent({
  props: {
    query: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const da = reactive({
      columns: [], //表格的列信息
      data: [], //表格的数据
      curPage: 1, //表格的当前页
      pageSize: 10, //每一页显示的数据
      totalCount: 100, //数据总数
      pageSizeOptions: ["10", "20", "50", "100"],
      selectedRowKeys: [],
      scrollY: 300, //表格的高度
      loading:false,
      handleResizeColumn(w, col) {
        //拖拉列宽
        col.width = w;
      },
      onPageChange(pageNumber) {
        //当页开始改变的时候
        da.curPage = pageNumber;
      },
      onShowSizeChange(curPage, pageSize) {
        //当每页的数据条数改变的时候
        da.pageSize = pageSize;
      },
      init() {
        watch(//监控查询和分页的变化 重新查询数据
          () => [da.curPage,da.pageSize,props.query],
          () => {
            da.loadData()
          }
          ,{deep:true}
        );
        watch(
          ()=>da.selectedRowKeys,
          (keys)=>{
            var dataStatus={
              selected:[],
              unSelected:[]
            }
            da.data.forEach(e=>{
              var flag=false;
              for(var k in keys){
                if(keys[k]==e.key){
                  flag=true;
                }
              }
              if(flag) dataStatus.selected.push(e)
              else dataStatus.unSelected.push(e)
            })
            ctx.emit('updateTableData',dataStatus)
          }
        )
      },
      loadData() {
        da.loading=true;
        //加载表格数据
        var params = {
          query: props.query,
          page: {
            cur: da.curPage,
            size: da.pageSize,
          },
        };
        console.log("load table data ->", params);
        getListEgData(params).then((r) => {
          da.curPage=r.data.page.cur;
          da.pageSize=r.data.page.size;
          da.totalCount=r.data.page.total;
          da.data = r.data.list;
          da.loading=false;
        });
      },
    });
    //获取远端表格的列信息
    getListColumns().then((r) => {
      da.columns = r.data;
    });
    var container = ref(null);
    onMounted(() => {
      da.scrollY = container.value.$el.offsetHeight - 80; //设置表格的高度
      da.loadData();
    });

    //表格的行选择器
    const rowSelection = computed(() => {
      return {
        selectedRowKeys: da.selectedRowKeys,
        onChange: (selectedRowKeys) => {
          da.selectedRowKeys = selectedRowKeys;
        },
        hideDefaultSelections: true,
        selections: [
          {
            key: "all",
            text: "全选",
            onSelect: (changableRowKeys) => {
              da.selectedRowKeys = changableRowKeys;
            },
          },

          {
            key: "invert",
            text: "反选",
            onSelect: (changableRowKeys) => {
              var newSelectedRowKeys = changableRowKeys.filter((k) => {
                return !da.selectedRowKeys.includes(k);
              });
              da.selectedRowKeys = newSelectedRowKeys;
            },
          },
          {
            key: "odd",
            text: "偶数",
            onSelect: (changableRowKeys) => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
                return index % 2 !== 0;
              });
              da.selectedRowKeys = newSelectedRowKeys;
            },
          },
          {
            key: "even",
            text: "奇数",
            onSelect: (changableRowKeys) => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((_key, index) => {
                return index % 2 == 0;
              });
              da.selectedRowKeys = newSelectedRowKeys;
            },
          },
          {
            key: "unall",
            text: "清除",
            onSelect: (changableRowKeys) => {
              da.selectedRowKeys = [];
            },
          },
        ],
      };
    });

    da.init();
    const onChange = (pagination, filters, sorter) => {
      da.scrollY = container.value.$el.offsetHeight;
      console.log("params", pagination, filters, sorter);
    };
    return {
      da,
      rowSelection,
      onChange,
      container,
    };
  },
});
</script>

<style scoped>
.ant-layout,
a-layout-content {
  height: 100%;
}
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
/* .happ_table >>> .ant-table-pagination.ant-pagination{
    display: none;
} */
.ant-layout-footer {
  background: #fff;
}
.happ_table >>> .ant-table 
,.happ_table >>> .ant-table-wrapper
,.happ_table >>> .ant-spin-nested-loading
,.happ_table >>> .ant-spin-container
,.happ_table >>> .ant-table-container
,.happ_table >>> .ant-table-body{
  height: 100%!important;
  box-sizing: border-box;
}
</style>
