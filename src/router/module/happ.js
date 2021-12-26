
export default [
    {
        path: '/happ_app',
        name: 'happ_app',
        component: () => import('@/views/pages/happ/detial/index.vue'),
    },
    {
        path: '/happ_list',
        name: 'happ_list',
        component: () => import('@/views/pages/happ/list/index.vue'),
    }
]