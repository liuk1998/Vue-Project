/*
 * @Author: liuk kekeliu_job@163.com
 * @Date: 2022-07-03 11:15:54
 * @LastEditors: liuk kekeliu_job@163.com
 * @LastEditTime: 2022-07-14 15:03:03
 * @FilePath: /myself-web/src/api/login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
