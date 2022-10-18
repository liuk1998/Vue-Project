import Vue from 'vue'
import ElementUI from 'element-ui' // 引入 Element
import 'element-ui/lib/theme-chalk/index.css' // 引入 Element
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang' // 国际化
import moment from 'moment' // 时间格式化工具
import '@/style/login.scss'
import '@/style/index.scss'
import ga from './directive/ga/index'
import * as filters from './filters' // 公共过滤器
require('./mock/mock') // mock假数据

Vue.use(i18n)
Vue.use(ElementUI) // 引入 Element
Vue.use(ga) // 自定义指令
Vue.prototype.$moment = moment // 绑入原型链
Object.keys(filters).forEach(key => { // 设置公共过滤器
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false // 阻止启动生产消息

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
