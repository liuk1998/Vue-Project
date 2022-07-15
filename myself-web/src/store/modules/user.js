/*
 * @Author: liuk kekeliu_job@163.com
 * @Date: 2022-07-01 21:04:14
 * @LastEditors: liuk kekeliu_job@163.com
 * @LastEditTime: 2022-07-15 14:16:40
 * @FilePath: /myself-web/src/store/modules/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { login } from '@/api/login'
import { getToken } from '@/utils/auth'

const user = {
  // 常量 使用: this.$store.getters.token
  state: {
    token: getToken(),
    username: ''
  },
  mutations: {
    // 同步改变state中的状态; 使用方式: 标签中: @click="$store.commit('SET_TOKEN')"; 函数中: this.$store.commit('SET_TOKEN')
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    }
  },
  // 异步改变state中的状态
  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response
          commit('SET_USERNAME', data.loginChannel === 0 ? data.email : data.phone)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user
