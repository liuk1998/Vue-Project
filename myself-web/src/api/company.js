import request from '@/utils/request'

// 获取公司信息
export function getCompany (params) {
  return request({
    url: '/comp/comp-company/',
    method: 'get',
    params
  })
}
