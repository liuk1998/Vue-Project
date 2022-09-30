import { paramsObj } from '@/utils/index'

const companyInfo = JSON.parse(localStorage.companyInfo)

export default {
  // 获取公司信息
  getCompany: config => {
    const data = paramsObj(config.url)
    const info = companyInfo.filter(v => v.companyId === data.id)[0]
    return {
      code: 0,
      data: info
    }
  }
}
