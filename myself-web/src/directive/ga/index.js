import Vue from 'vue'
import ga from './ga.js'

const install = function (Vue) {
  Vue.directive('ga', ga) // 注册一个全局自定义指令 `v-ga`
}

if (window.Vue) {
  window.ga = ga
  Vue.use(install)
}

ga.install = install

export default ga
