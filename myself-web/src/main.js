/*
 * @Author: liuk kekeliu_job@163.com
 * @Date: 2022-05-20 14:05:28
 * @LastEditors: liuk kekeliu_job@163.com
 * @LastEditTime: 2022-07-15 14:21:49
 * @FilePath: /myself-web/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import ElementUI from 'element-ui' // 引入 Element
import 'element-ui/lib/theme-chalk/index.css' // 引入 Element
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang' // 国际化
import '@/style/login.scss'
import ga from './directive/ga/index'
require('./mock/mock')

Vue.use(i18n)
Vue.use(ElementUI) // 引入 Element
Vue.use(ga) // 自定义指令

Vue.config.productionTip = false // 阻止启动生产消息

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
