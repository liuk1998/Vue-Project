import { paramsObj } from '@/utils/index'
import i18n from '@/lang/index'

const emailList = JSON.parse(localStorage.emailList)
const phoneList = JSON.parse(localStorage.phoneList)

// 设置 localStorage 的登录信息
function setEmailOrPhone () {
  localStorage.emailList = JSON.stringify(emailList)
  localStorage.phoneList = JSON.stringify(phoneList)
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
      setEmailOrPhone()
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
  // 忘记密码
  forgetPassword: config => {
    const data = JSON.parse(config.body)
    if (Object.keys(emailList).includes(data.email) || Object.keys(phoneList).includes(data.phone)) {
      if (Object.keys(emailList).includes(data.email)) {
        emailList[data.email] = { password: data.password, loginChannel: 0, name: data.name }
      } else if (Object.keys(phoneList).includes(data.phone)) {
        phoneList[data.phone] = { password: data.password, loginChannel: 1, name: data.name }
      }
      setEmailOrPhone()
      return {
        code: 0,
        data: null,
        message: i18n.t('login.passwordChangedSuccessfully')
      }
    } else if (!Object.keys(emailList).includes(data.email) && data.channel === 1) {
      return {
        code: 1,
        data: null,
        message: i18n.t('login.emailNotRegistered')
      }
    } else if (!Object.keys(phoneList).includes(data.phone) && data.channel === 0) {
      return {
        code: 1,
        data: null,
        message: i18n.t('login.phoneNotRegistered')
      }
    }
  },
  getUserInfo: config => {
    const { token } = paramsObj(config.url)
    console.log('token>>', token)
  }
}
