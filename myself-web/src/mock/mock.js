/*
 * @Author: liuk kekeliu_job@163.com
 * @Date: 2022-07-01 20:02:06
 * @LastEditors: liuk kekeliu_job@163.com
 * @LastEditTime: 2022-07-14 16:10:20
 * @FilePath: /myself-web/src/mock/mock.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Mock from 'mockjs'
import loginApi from './loginApi.js'

// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
  timeout: '300-600'
})

// 模拟接口登录
Mock.mock(/\/user\/login/, 'post', loginApi.loginByUsername)
Mock.mock(/\/user\/info\.*/, 'get', loginApi.getUserInfo)
