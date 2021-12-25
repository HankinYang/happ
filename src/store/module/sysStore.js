
import { getUserInfo } from '@/api/sys'

var sysStore= {
    state: {
        loading:false,
        isFold:false,//是否折叠
        currentKey:'',//当前头部菜单的key
        userInfo:{//用户信息
            name:'Hankin Yang',
            avatarCategory:'str',
            avatar:'H.Y',
            dept:'资讯中心',
            title:'工程师',
        },
        currentLanguage:{},
        
    },
    mutations: {
        toggleCollapsed:state=>state.isFold=!state.isFold,
        setCurrentKey:(state,key)=>state.currentKey=key,
        changeLanguage:(state,lan)=>state.currentLanguage=lan
    },
    actions: {
    },
    modules: {
    }
}
getUserInfo().then(r=>{
    sysStore.userInfo=r.data;
})
export default sysStore;