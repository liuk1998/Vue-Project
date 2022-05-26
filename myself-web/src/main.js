import Vue from 'vue'
import ElementUI from 'element-ui' // 引入 Element
import 'element-ui/lib/theme-chalk/index.css' // 引入 Element
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './lang' // 国际化
import '@/style/login.scss'

Vue.use(i18n)
Vue.use(ElementUI) // 引入 Element

Vue.config.productionTip = false // 阻止启动生产消息

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
