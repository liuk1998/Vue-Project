import axios from 'axios'
import { Message, MessageBox, Loading } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

let loading = null // 定义loading变量
// 开始 加载loading
const startLoading = () => {
  // 以服务的方式调用。引入 Loading 服务
  loading = Loading.service({
    lock: true, // 锁定屏幕的滚动
    background: 'rgba(250, 245, 242, 0.8)' // 遮罩背景色
  })
}
// 结束 取消loading加载
const endLoading = () => {
  loading.close()
}
// showFullScreenLoading() 与 tryHideFullScreenLoading() 目的是合并同一页面多个请求触发loading
let loadingCount = 0
const showFullScreenLoading = (noLoading = false) => {
  if (noLoading) return // 不需要全局加载中状态
  if (loadingCount === 0) { // 当等于0时证明第一次请求 这时开启loading
    startLoading()
  }
  loadingCount++
}
const tryHideFullScreenLoading = (noLoading = false) => {
  if (noLoading || loadingCount <= 0) return // 不需要全局加载中状态,小于等于0 证明没有开启loading 此时return
  loadingCount-- // 正常响应后 全局变量 --
  if (loadingCount === 0) { // 等于0 时证明全部加载完毕 此时结束loading 加载
    endLoading()
  }
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // 开启loading加载
  if (!sessionStorage.noLoading) {
    showFullScreenLoading(config.noLoading)
  }
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // 关闭loading加载
  tryHideFullScreenLoading(error.noLoading)
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    tryHideFullScreenLoading(response.noLoading)
    // code为非20000是抛错 可结合自己业务进行修改
    const res = response.data
    if (res.code !== 0) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('error')
    } else {
      if (res.message) {
        Message({
          message: res.message,
          type: 'success',
          duration: 5 * 1000
        })
      }
      return response.data
    }
  },
  error => {
    // 关闭loading加载
    tryHideFullScreenLoading(error.noLoading)
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
