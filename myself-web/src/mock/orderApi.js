import { randomNum } from '@/utils/index'

export default {
  // 获取新的支付订单(登录后)
  getNewOrders: config => {
    return {
      code: 0,
      data: {
        paidNum: randomNum(0, 50),
        pickingNum: randomNum(0, 50),
        readyToShipNum: randomNum(0, 50)
      }
    }
  }
}
