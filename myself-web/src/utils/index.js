
// todo  mock假数据(查询)
export function paramsObj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

// todo 生成随机数
export function randomNum (min, max) {
  return ~~(Math.random() * (max - min) + min)
}
