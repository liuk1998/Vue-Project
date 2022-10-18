import moment from 'moment'
// 全局过滤器

export function dateFormat (date, sformat) {
  return date ? moment(date).format(sformat) : ''
}

export function formatDateDisplay (dateStr, sFormat = 'DD-MM-YYYY HH:mm:ss', type = 'serverToLocal', addTimezone = true) {
  if (dateStr) {
    const date = moment(dateStr).toDate()
    let addHours = new Date().getTimezoneOffset() / 60 // 返回格林威治时间和本地时间之间的时差
    if (type === 'serverToLocal') {
      addHours = 0 - addHours
    }
    if (!addTimezone) {
      addHours = 0
    }
    const dateTimezone = new Date(date.getTime() + addHours * 3600 * 1000)
    return dateFormat(dateTimezone, sFormat)
  } else {
    return dateStr
  }
}
