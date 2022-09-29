// ! 存储 mock 假数据的静态数据
// 邮箱登录
export const emailList = {
  'niushanshan001@gmail.com': {
    password: '11111111',
    loginChannel: 0,
    name: 'niushanshan',
    phone: '+8617366098967'
  },
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
  },
  '+8617366098967': {
    password: '11111111',
    loginChannel: 1,
    name: 'niushanshan',
    email: 'niushanshan001@gmail.com'
  }
}

// 用户信息
export const userInfo = [{
  username: 'niushanshan', // 用户姓名
  userId: 1, // 用户id
  email: 'niushanshan001@gmail.com',
  companyId: 1, // 公司id
  guidanceFlag: '1',
  orderPageFlag: '1',
  returnPageFlag: '1',
  noticeId: '44',
  promotionGuide: '1'
}]
