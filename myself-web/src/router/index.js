/*
 * @Author: liuk kekeliu_job@163.com
 * @Date: 2022-05-20 14:05:28
 * @LastEditors: liuk kekeliu_job@163.com
 * @LastEditTime: 2022-06-07 11:07:47
 * @FilePath: /myself-web/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
  }
]

const router = new VueRouter({
  routes
})

export default router
