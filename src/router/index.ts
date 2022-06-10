import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'UserFilled'
    },
    children: [
      {
        path: '/userManagement',
        component: () => import('@/views/userMangement/index.vue'),
        name: 'user',
        meta: {
          title: '用户列表',
          icon: 'UserFilled'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
