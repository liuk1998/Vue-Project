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

// 获取用户信息
export function getInfo (token) {
  return request({
    url: 'user/login',
    method: 'get',
    data: { token }
  })
}
