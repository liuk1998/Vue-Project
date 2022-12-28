// ! 存储 mock 假数据的静态数据
// 邮箱登录
export const emailList = {
  '157604279@qq.com': {
    password: '11111111',
    loginChannel: 0,
    name: 'liuK',
    phone: '+8618342214686',
    userId: '1'
  },
  '840927735@qq.com': {
    password: '11111111',
    loginChannel: 0,
    name: 'liuYanQ',
    phone: '+8613644093298',
    userId: '2'
  }
}

// 手机号登录
export const phoneList = {
  '+8618342214686': {
    password: '11111111',
    loginChannel: 1,
    name: 'liuK',
    email: '157604279@qq.com',
    userId: '1'
  },
  '+8613644093298': {
    password: '11111111',
    loginChannel: 1,
    name: 'liuYanQ',
    email: '840927735@qq.com',
    userId: '2'
  }
}

// 用户信息
export const userInfo = [{
  username: 'liuKe', // 用户名
  userId: '1', // 用户id
  email: '157604279@qq.com',
  companyId: '1', // 公司id
  guidanceFlag: '1',
  orderPageFlag: '1',
  returnPageFlag: '1',
  noticeId: '44',
  promotionGuide: '1',
  sysResources: [{ // 用户配置
    componentName: 'dashboard',
    nameChinese: '看板',
    nameEnglish: 'DashBoard',
    type: '0'
  }, {
    componentName: 'shop',
    type: '0'
  }, {
    componentName: 'orderlist',
    type: '0'
  }, {
    componentName: 'product',
    type: '0'
  }, {
    componentName: 'masterproduct',
    type: '0'
  }, {
    componentName: 'promotion',
    type: '0'
  }, {
    componentName: 'chat',
    type: '0'
  }, {
    componentName: 'report',
    type: '0'
  }],
  three: true
}, {
  username: 'liuYanQ',
  userId: '2',
  email: '840927735@qq.com',
  companyId: null,
  guidanceFlag: '1',
  orderPageFlag: '1',
  returnPageFlag: '1',
  noticeId: '44',
  promotionGuide: '1',
  sysResources: [],
  three: false
}]

// 公司信息
export const companyInfo = [{
  companyId: '1', // 公司id
  name: 'Stokis-LiuK', // 公司名称
  guideStatus: 0, // 0 未激活， 1 需要引导  ，2已完成
  wmsStatusFlag: 0, // 入口权限的接口  1开启  0关闭
  logo: null, // 公司logo
  guideCompleteIndex: '0', // 引导进入第几步
  saasVersionName: 'Basic', // 系统版本(付费或试用)
  versionDeadline: '2023-08-02 00:00:00' // 试用到期时间
}]
