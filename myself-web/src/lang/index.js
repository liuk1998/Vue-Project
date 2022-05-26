import Vue from 'vue'
import VueI18n from 'vue-i18n'
// 引入element的语言包
import locale from 'element-ui/lib/locale' // 本地
import elementEnLocale from 'element-ui/lib/locale/lang/en' // 英文
import elementZHLocale from 'element-ui/lib/locale/lang/zh-CN' // 中文
// 引入需要语言包的js文件
import zhLocale from './zh'
import enLocale from './en'
import { DEFAULT_LANGUAGE } from '@/utils/constant'

Vue.use(VueI18n)

const i18n = new VueI18n({

  locale: sessionStorage.getItem('lang') || DEFAULT_LANGUAGE, // 语言标识 -> 获取本地选择的语言

  silentTranslationWarn: true,
  messages: {
    zh: {
      ...zhLocale,
      ...elementZHLocale
    }, // 中文语言包
    en: {
      ...enLocale,
      ...elementEnLocale
    } // 英文语言包
  }
})
// 设置语言
locale.i18n((key, value) => i18n.t(key, value))

export default i18n
