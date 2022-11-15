import request from '@/utils/request'

// 登录
export function login (data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

// 注册
export function register (data) {
  return request({
    url: '/api/user/register',
    method: 'post',
    data
  })
}

// 忘记密码
export function forgetPassword (data) {
  return request({
    url: '/api/user/password-check',
    method: 'post',
    data
  })
}

// 重置密码
export function resetPassword (data) {
  return request({
    url: '/api/user/password-reset',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo (params) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params,
    noLoading: true // 不需要loading
  })
}
