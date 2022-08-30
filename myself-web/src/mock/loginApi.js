import { paramsObj } from '@/utils/index'
import i18n from '@/lang/index'

// 邮箱登录
const emailList = {
  'niushanshan001@gmail.com': {
    password: '11111111',
    loginChannel: 0
  }
}
// 手机号登录
const phoneList = {
  '+8618342214686': {
    password: '11111111',
    loginChannel: 1
  },
  '+8613644093298': {
    password: '11111111',
    loginChannel: 1
  }
}

export default {
  // 登录
  loginByUsername: config => {
    const data = JSON.parse(config.body)
    if (data.loginChannel === 0 && emailList[data.email] && data.password === emailList[data.email].password) {
      return {
        code: 0,
        data: data,
        message: i18n.t('login.loginSuccess')
      }
    } else if (data.loginChannel === 1 && phoneList[data.phone] && data.password === phoneList[data.phone].password) {
      return {
        code: 0,
        data: data,
        message: i18n.t('login.loginSuccess')
      }
    } else {
      return {
        code: 'ERROR',
        message: i18n.t('login.loginErr')
      }
    }
  },
  getUserInfo: config => {
    const { token } = paramsObj(config.url)
    console.log('token>>', token)
  }
}
