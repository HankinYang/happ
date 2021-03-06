import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import sysRoutes from './module/sys.js'
import happRoutes from './module/happ.js'

const routes = [
  ...sysRoutes,
  ...happRoutes,
  {
    path: '/',
    name: 'Home',
    redirect:'/sys'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
