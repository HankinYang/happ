<template>
  <a-space v-if="fields && fields.length">
    <!-- 检索字段 -->
    <a-select style="width: 200px" @change="da.fieldChange">
      <a-select-opt-group
        v-for="(item, i) in fields"
        :key="i"
        v-model:value="da.curField.name"
      >
        <template #label>
          <span> {{ item.label }} </span>
        </template>
        <a-select-option
          :value="f.name"
          v-for="(f, fi) in item.fields"
          :key="fi"
          >{{ f.label }}</a-select-option
        >
      </a-select-opt-group>
    </a-select>
    <!-- 检索操作符 -->
    <a-select
      style="width: 120px"
      v-model:value="da.curCompare.value"
      @change="da.compareChange"
    >
      <a-select-option
        :value="c.value"
        v-for="(c, ci) in da.compares"
        :key="ci"
        >{{ c.label }}</a-select-option
      >
    </a-select>

    <!-- 检索值 -->
    <a-input-number
      v-if="da.curField.fieldCategory == 'InputNumber'"
      v-model:value="da.curVal"
      :placeholder="da.inputPlaceholder"
      style="width: 200px"
    />
    <a-select
      v-else-if="da.curField.fieldCategory == 'select'"
      v-model:value="da.curVal"
      style="width: 200px"
      :options="da.curField.extend.list"
    >
    </a-select>
    <a-date-picker
      v-else-if="da.curField.fieldCategory == 'DatePicker'"
      v-model:value="da.curVal"
      style="width: 200px"
    />
    <a-radio-group
      v-else-if="da.curField.fieldCategory == 'radio'"
      v-model:value="da.curVal"
      name="radioGroup"
      style="width: 200px"
    >
      <a-radio
        v-for="(r, ri) in da.curField.extend.list"
        :name="da.curField.name_radio"
        :key="ri"
        :value="r.value"
        >{{ r.label }}</a-radio
      >
    </a-radio-group>
    <a-checkbox
      v-else-if="da.curField.fieldCategory == 'checkbox'"
      v-model:checked="da.curVal"
      >{{ r.label }}</a-checkbox
    >
    <a-input
      v-else
      v-model:value="da.curVal"
      :placeholder="da.inputPlaceholder"
      style="width: 200px"
    />
    <!-- 逻辑符 -->
    <a-select v-model:value="da.logicValue" style="width: 80px">
      <a-select-option value="and">并且</a-select-option>
      <a-select-option value="or">或者</a-select-option>
    </a-select>
  </a-space>
</template>

<script>
import { reactive, computed, watch } from "vue";

//各种数据类型对应的比较符号
const typeComparesDisabled = {
  int: {
    compares: [
      { label: "大于", value: ">", disabled: false },
      { label: "大于等于", value: ">=", disabled: false },
      { label: "小于", value: "<", disabled: false },
      { label: "小于等于", value: "<=", disabled: false },
    ],
    value: 0,
  },
  decimal: {
    compares: [
      { label: "大于", value: ">", disabled: false },
      { label: "大于等于", value: ">=", disabled: false },
      { label: "小于", value: "<", disabled: false },
      { label: "小于等于", value: "<=", disabled: false },
    ],
    value: 0,
  },
  date: {
    compares: [
      { label: "包含", value: "like", disabled: false },
      { label: "大于", value: ">", disabled: false },
      { label: "大于等于", value: ">=", disabled: false },
      { label: "小于", value: "<", disabled: false },
      { label: "小于等于", value: "<=", disabled: false },
      { label: "开始于", value: "start", disabled: false },
      { label: "结束于", value: "end", disabled: false },
    ],
    value: "",
  },
  other: {
    compares: [
      { label: "包含", value: "like", disabled: false },
      { label: "大于", value: ">", disabled: false },
      { label: "大于等于", value: ">=", disabled: false },
      { label: "小于", value: "<", disabled: false },
      { label: "小于等于", value: "<=", disabled: false },
      { label: "开始于", value: "start", disabled: false },
      { label: "结束于", value: "end", disabled: false },
    ],
    value: "",
  },
};
export default {
  props: {
    fields: {
      //查询的字段数组
      type: Array,
      default: () => [],
    },
    idx: {
      //一个标识
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    //   if(!props.fields || !props.length) return;
    let da = reactive({
      //   fields: [
      //     {
      //       name: "app1",
      //       label: "app1",
      //       fields: [
      //         {
      //           name: "field2",
      //           label: "姓名",
      //           valCategory: "string",
      //           fieldCategory: "",
      //         },
      //         {
      //           name: "field1",
      //           label: "年龄",
      //           valCategory: "int",
      //           fieldCategory: "InputNumber",
      //         },
      //         {
      //           name: "field3",
      //           label: "生日",
      //           valCategory: "date",
      //           fieldCategory: "DatePicker",
      //         },
      //         {
      //           name: "field4",
      //           label: "学历",
      //           valCategory: "string",
      //           fieldCategory: "select",
      //           extend: {
      //             list: [
      //               { label: "大学", value: "4" },
      //               { label: "大学", value: "3" },
      //               { label: "大学", value: "2" },
      //               { label: "大学", value: "1" },
      //             ],
      //           },
      //         },
      //         {
      //           name: "field5",
      //           label: "性别",
      //           valCategory: "bool",
      //           fieldCategory: "radio",
      //           extend: {
      //             list: [
      //               { value: 1, label: "男" },
      //               { value: 0, label: "女" },
      //             ],
      //           },
      //         },
      //         // {
      //         //   name: "field6",
      //         //   label: "是否成年",
      //         //   valCategory: "bool",
      //         //   fieldCategory: "checkbox",
      //         //   extend: {
      //         //     list: [{ value: 0, label: "是" }],
      //         //   },
      //         // },
      //       ],
      //     },
      //   ],
      compares: [
        //比较符号
        { label: "包含", value: "like", disabled: false },
        { label: "大于", value: ">", disabled: false },
        { label: "大于等于", value: ">=", disabled: false },
        { label: "小于", value: "<", disabled: false },
        { label: "小于等于", value: "<=", disabled: false },
        { label: "开始于", value: "start", disabled: false },
        { label: "结束于", value: "end", disabled: false },
      ],
      curField: {}, //当前所选的字段
      curCompare: {}, //当前所选的比较符号
      curVal: "", //当前的只
      logicValue: "and", //当前的逻辑操作符
      inputPlaceholder: computed(() => {
        return da.curField.label
          ? `请输入 ${da.curField.label} 的值`
          : "字段无效 或者没有选择字段";
      }),
      fieldChange(val) {
        props.fields.forEach((el) => {
          var sel = el.fields.filter((f) => f.name == val);
          if (sel && sel.length) {
            da.curField = sel[0];
          } else {
            da.curField = {};
          }
        });
      },
      compareChange(val) {
        var sel = da.compares.filter((f) => f.value == val);
        if (sel && sel.length) {
          da.curCompare = sel[0];
        } else {
          da.curCompare = {};
        }
      },
      changeInput(model) {
        var valCategory = da.curField.valCategory;
        var defSet =
          typeComparesDisabled[valCategory] || typeComparesDisabled["other"];
        da.compares = defSet.compares;
        if (model) da.curVal = defSet.val;
        
        // if(! Object.keys(da.curField).length)result
        //通知父组件 更新结果
        ctx.emit("updateCondition", {
          idx: props.idx,
          field: da.curField,
          compare: da.curCompare,
          val: da.curVal,
          logic: da.logicValue,
          isOk: da.curVal && Object.keys(da.curField).length && Object.keys(da.curCompare).length?true:false
        });
      },
    });
    watch(
      () => da.curField,
      (curField) => {
        da.changeInput(1);
      }
    );
    watch(
      () => da.curCompare,
      (curCompare) => {
        da.changeInput(1);
      }
    );
    watch(
      () => da.curVal,
      (val) => {
        da.changeInput();
      }
    );
    if (props.fields.length) da.curField = props.fields[0].fields[0];
    da.curCompares = da.compares[0];
    return {
      da,
    };
  },
};
</script>

<style>
</style>