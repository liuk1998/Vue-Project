
// todo  mock假数据(查询)
export function paramsObj (url) {
  console.log('mock假数据untils', url)
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}