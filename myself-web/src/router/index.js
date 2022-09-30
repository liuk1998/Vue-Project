import Vue from 'vue'
import VueRouter from 'vue-router'
import { PATH_NAME } from '@/utils/constant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login/login.vue') // 直接获取要跳转页面的位置, 延迟加载
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: () => import('@/views/login/forgetPassword.vue')
  },
  {
    path: '/home',
    name: PATH_NAME.PATH_NAME_DASHBOARD.name,
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/welcome',
    name: PATH_NAME.PATH_NAME_WELCOME.name,
    component: () => import('@/views/home/welcome.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/teacher/test05.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
