

export default [
    {
        path: '/sys',
        name: 'sys',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/sys/index.vue'),
        redirect:'/sys/tem',
        children:[
            {
                path:'/sys/tem',
                name:'system',
                component:()=> import('@/views/sys/tem/index.vue')
            }
        ]
    }
]