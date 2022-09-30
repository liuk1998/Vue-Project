import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

// Vuex是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间的数据共享。
Vue.use(Vuex)

export default new Vuex.Store({
  // 常量 使用: this.$store.state.count
  state: {
  },
  // store.js的计算属性。
  getters: {
    token: state => state.user.token,
    username: state => state.user.username
  },
  // 同步改变state中的状态; 使用方式: 标签中: @click="$store.commit('add')"; 函数中: this.$store.commit('add') 或 store.commit('add')
  mutations: {
  },
  // 异步改变state中的状态
  actions: {
  },
  // 模块化
  modules: {
    user
  }
})
