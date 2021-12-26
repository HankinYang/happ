<template>
  <div class="hfield" style="width:300px;">
      <a-form-item>
        <template #label>
           {{da.label}}
        </template>
        <a-input v-if="da.showInfo.category=='text'" v-model:value="da.val" :disabled="da.showInfo.disabled" @change="fieldChange" @keyup="keyup"/>
        <a-input-number v-else-if="da.showInfo.category=='number'" v-model:value="da.val" :disabled="da.showInfo.disabled" @change="fieldChange" @keyup="keyup"/>
      </a-form-item>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
export default {
    props:{
        da:{
            type:Object,
            default:()=>{
                return{
                    label:''
                }
            }
        }
    },
    setup(props,ctx){
        // console.log(props.da);
        props.da.val='';
        const state=reactive({
        });
        const fieldChange=(e)=>{
            ctx.emit('fieldChange',{field:props.da,data:e});
        }
        const keyup=(e)=>{
            ctx.emit('fieldKeyup',{field:props.da,data:e});
        }
        return {
            state,
            fieldChange,
            keyup
        }
    }
}
</script>

<style lang="scss" scoped>
.hfield{
    display: inline-block;
    margin-right: 20px;


}

.ant-card >>> .ant-card-head-title{
    padding: 0;
}
</style>