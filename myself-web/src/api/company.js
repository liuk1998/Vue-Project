import request from '@/utils/request'

// 获取公司信息
export function getCompany (params) {
  return request({
    url: '/api/comp/comp-company/',
    method: 'get',
    params
  })
}
