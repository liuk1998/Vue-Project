import request from '@/utils/request'

// 登录
export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

// 注册
export function register (data) {
  return request({
    url: '/user/register',
    method: 'post',
    data: data
  })
}

// 忘记密码
export function forgetPassword (data) {
  return request({
    url: '/user/password-check',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo (token) {
  return request({
    url: 'user/login',
    method: 'get',
    data: { token }
  })
}
