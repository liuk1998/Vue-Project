import { paramsObj } from '@/utils/index'
import i18n from '@/lang/index'

const emailList = JSON.parse(localStorage.emailList)
const phoneList = JSON.parse(localStorage.phoneList)
const userInfo = JSON.parse(localStorage.userInfo)

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
        data: emailList[data.email],
        message: i18n.t('login.loginSuccess')
      }
    } else if (data.loginChannel === 1 && phoneList[data.phone] && data.password === phoneList[data.phone].password) {
      return {
        code: 0,
        data: phoneList[data.phone],
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
      emailList[data.email] = { password: data.password, loginChannel: 0, name: data.name, phone: data.phone }
      phoneList[data.phone] = { password: data.password, loginChannel: 1, name: data.name, email: data.email }
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
        emailList[data.email].password = data.password
        for (const i in emailList) {
          phoneList[i.phone].password = data.password
        }
      } else if (Object.keys(phoneList).includes(data.phone)) {
        phoneList[data.phone].password = data.password
        for (const i in phoneList) {
          emailList[i.email].password = data.password
        }
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
  // 获取用户的信息
  getUserInfo: config => {
    const data = paramsObj(config.url)
    const info = userInfo.filter(v => v.username === data.name)[0]
    return {
      code: 0,
      data: info
    }
  }
}
