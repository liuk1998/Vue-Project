import request from '@/utils/request'

// 登录
export function login (data) {
  return request({
    url: '/user/login',
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
