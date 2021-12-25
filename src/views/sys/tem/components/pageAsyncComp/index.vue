<template>
    <!-- <pageComp /> -->
    <component :is="AsyncComp" @openTab="openTab"/>
</template>

<script>
import {defineAsyncComponent,resolveDynamicComponent } from 'vue'

export default {
    props:{
        contentComp:{
            type:String,
            default:'test'
        }
    },
    setup(props,ctx){
        let AsyncComp = {};//defineAsyncComponent(() =>import(`@/views/sys/tem/pages/${compName}/index.vue`))
        try{
            console.log(props.contentComp)
            require(`@/views/pages/${props.contentComp}/index.vue`)
            AsyncComp=resolveDynamicComponent(defineAsyncComponent(() =>import(`@/views/pages/${props.contentComp}/index.vue`)))
            
        }catch(e){
            console.error('动态加载组件失败->'+props.contentComp,e)
            AsyncComp=resolveDynamicComponent(defineAsyncComponent(() =>import(`@/views/pages/tipPage/404/index.vue`)));
        }

        const openTab=(params)=>{
            ctx.emit('openTab',params)
        }
        
        return{
            AsyncComp,
            openTab
        }
    }
};
</script>

<style>
</style>