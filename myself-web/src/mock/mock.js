import Mock from 'mockjs'
import loginApi from './loginApi.js'
import orderApi from './orderApi'
import companyApi from './companyApi'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// 模拟接口: 1.拦截的url  2.拦截的ajax请求  3.数据模版或响应数据的函数
Mock.mock(/\/api\/user\/login/, 'post', loginApi.loginByUsername) // 登录;当调用登录接口user/loign时候会自动对应到loginByUsername这个函数执行这个函数,这个函数会返回是否登录成功数据。返回成功的数据,就是登录成功了,否则相反。
Mock.mock(/\/api\/user\/register/, 'post', loginApi.registerByUsername)
Mock.mock(/\/api\/user\/password-check/, 'post', loginApi.forgetPassword)
Mock.mock(/\/api\/user\/info\.*/, 'get', loginApi.getUserInfo)
Mock.mock(/\/api\/order\/get-new-orders/, 'get', orderApi.getNewOrders)
Mock.mock(/\/api\/comp\/comp-company/, 'get', companyApi.getCompany)
