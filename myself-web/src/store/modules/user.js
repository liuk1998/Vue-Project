/*
 * @Author: liuk kekeliu_job@163.com
 * @Date: 2022-07-01 21:04:14
 * @LastEditors: liuk kekeliu_job@163.com
 * @LastEditTime: 2022-07-14 15:04:01
 * @FilePath: /myself-web/src/store/modules/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { login } from '@/api/login'
import { getToken, setToken } from '@/utils/auth'

const user = {
  // 常量 使用: this.$store.getters.loginErrorTimesInt
  state: {
    token: getToken()
  },
  mutations: {
    // 同步改变state中的状态; 使用方式: 标签中: @click="$store.commit('SET_CODE')"; 函数中: this.$store.commit('SET_CODE')
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  // 异步改变state中的状态
  actions: {
    Login ({ commit }, userInfo) {
      console.log('userInfo>>>', userInfo)
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          const data = res
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user
