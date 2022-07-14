/*
 * @Author: liuk kekeliu_job@163.com
 * @Date: 2022-07-01 20:09:09
 * @LastEditors: liuk kekeliu_job@163.com
 * @LastEditTime: 2022-07-14 15:44:21
 * @FilePath: /myself-web/src/mock/loginApi.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { paramsObj } from '@/utils/index'

export default {
  loginByUsername: () => {
    console.log('奥买嘎')
    return {
      code: 0,
      Message: 'success'
    }
  },
  getUserInfo: config => {
    const { token } = paramsObj(config.url)
    console.log('token>>', token)
  }
}
