// ! 存储 mock 假数据的静态数据
// 邮箱登录
export const emailList = {
  '157604279@qq.com': {
    password: '11111111',
    loginChannel: 0,
    name: 'liuK',
    phone: '+8618342214686'
  },
  '840927735@qq.com': {
    password: '11111111',
    loginChannel: 0,
    name: 'liuYanQ',
    phone: '+8613644093298'
  }
}

// 手机号登录
export const phoneList = {
  '+8618342214686': {
    password: '11111111',
    loginChannel: 1,
    name: 'liuK',
    email: '157604279@qq.com'
  },
  '+8613644093298': {
    password: '11111111',
    loginChannel: 1,
    name: 'liuYanQ',
    email: '840927735@qq.com'
  }
}

// 用户信息
export const userInfo = [{
  username: 'liuK', // 用户名
  userId: 1, // 用户id
  email: '157604279@qq.com',
  companyId: '1', // 公司id
  guidanceFlag: '1',
  orderPageFlag: '1',
  returnPageFlag: '1',
  noticeId: '44',
  promotionGuide: '1',
  sysResources: [{ // 用户配置
    appType: '00',
    componentName: 'dashboard',
    nameChinese: '看板',
    nameEnglish: 'DashBoard'
  }]
}, {
  username: 'liuYanQ',
  userId: 2,
  email: '840927735@qq.com',
  companyId: null,
  guidanceFlag: '1',
  orderPageFlag: '1',
  returnPageFlag: '1',
  noticeId: '44',
  promotionGuide: '1',
  sysResources: [{
    // appType: '00',
    // componentName: 'dashboard',
    // nameChinese: '看板',
    // nameEnglish: 'DashBoard'
  }]
}]

// 公司信息
export const companyInfo = [{
  companyId: '1', // 公司id
  name: 'Stokis-LiuK', // 公司名称
  guideStatus: 2, // 0 未激活， 1 需要引导  ，2已完成
  wmsStatusFlag: 0, // 入口权限的接口  1开启  0关闭
  logo: '', // 公司logo
  guideCompleteIndex: '0' // 引导
}]
