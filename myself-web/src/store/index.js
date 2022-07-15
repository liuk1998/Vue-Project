/*
 * @Author: liuk kekeliu_job@163.com
 * @Date: 2022-05-20 14:05:28
 * @LastEditors: liuk kekeliu_job@163.com
 * @LastEditTime: 2022-07-15 13:39:07
 * @FilePath: /myself-web/src/store/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

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
