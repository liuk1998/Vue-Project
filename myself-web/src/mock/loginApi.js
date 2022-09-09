import { paramsObj } from '@/utils/index'
import i18n from '@/lang/index'

// 邮箱登录
const emailList = {
  'niushanshan001@gmail.com': {
    password: '11111111',
    loginChannel: 0,
    name: 'niushanshan'
  }
}
// 手机号登录
const phoneList = {
  '+8618342214686': {
    password: '11111111',
    loginChannel: 1,
    name: 'liuk'
  },
  '+8613644093298': {
    password: '11111111',
    loginChannel: 1,
    name: 'liuYanQ'
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
  // 注册
  registerByUsername: config => {
    const data = JSON.parse(config.body)
    if (!Object.keys(emailList).includes(data.email) && !Object.keys(phoneList).includes(data.phone)) {
      emailList[data.email] = { password: data.password, loginChannel: 0, name: data.name }
      phoneList[data.phone] = { password: data.password, loginChannel: 1, name: data.name }
      return {
        code: 0,
        data: null,
        message: i18n.t('login.registerSuccess')
      }
    } else if (Object.keys(emailList).includes(data.email)) {
      return {
        code: 1,
        data: null,
        message: i18n.t('login.emailTips')
      }
    } else if (Object.keys(phoneList).includes(data.phone)) {
      return {
        code: 1,
        data: null,
        message: i18n.t('login.phoneTipsRepeated')
      }
    }
  },
  getUserInfo: config => {
    const { token } = paramsObj(config.url)
    console.log('token>>', token)
  }
}
