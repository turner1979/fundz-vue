import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import FdzHome from '../views/FdzHome.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: FdzHome
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/funds',
    name: 'funds',
    component: () => import(/* webpackChunkName: "funds" */ '../views/FdzFunds.vue')
  },
  {
    path: '/fund/:id',
    name: 'fund',
    props: true,
    component: () => import(/* webpackChunkName: "fund" */ '../views/FdzFund.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
