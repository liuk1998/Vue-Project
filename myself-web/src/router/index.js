import Vue from 'vue'
import VueRouter from 'vue-router'

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
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
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
