import { createApp } from 'vue/dist/vue.esm-bundler.js'
import Antd from 'ant-design-vue';
import STable from '@surely-vue/table';
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css';
import './assets/css/icofont/iconfont.css'
import '@surely-vue/table/dist/index.css'

createApp(App)
    .use(store)
    .use(router)
    .use(Antd)
    .use(STable)
    .mount('#app')
