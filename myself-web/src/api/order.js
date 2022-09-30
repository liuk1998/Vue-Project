import request from '@/utils/request'

// 获取新的支付订单(登录后)
export function getNewPaidOrderAfterLogin () {
  return request({
    url: '/order/get-new-orders',
    method: 'get'
  })
}
