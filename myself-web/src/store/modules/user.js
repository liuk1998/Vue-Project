import { login } from '@/api/login'
import { getToken } from '@/utils/auth'

const user = {
  // 常量 使用: this.$store.getters.token
  state: {
    token: getToken(),
    username: '',
    userInfo: {}, // 登录的用户信息
    companyInfo: {} // 公司信息
  },
  mutations: {
    // 同步改变state中的状态; 使用方式: 标签中: @click="$store.commit('SET_TOKEN')"; 函数中: this.$store.commit('SET_TOKEN')
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_USERINFO: (state, info) => { // 存储登录的用户信息
      state.userInfo = info
    },
    SET_COMPANY: (state, info) => { // 存储公司信息
      state.companyInfo = info
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
