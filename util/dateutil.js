module.exports = {
  getCurrentDate() {
    const date = new Date()
    const yearStr = date.getFullYear()
    const monthStr = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : ('' + (date.getMonth() + 1))
    const dateStr = date.getDate()
    return yearStr + '' + monthStr + '' + dateStr
  },
  getCurrentTime() {
    const date = new Date()
    const yearStr = date.getFullYear()
    const monthStr = (date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : ('' + (date.getMonth() + 1))
    const dateStr = date.getDate()
    const hourStr = date.getHours()
    const minutesStr = date.getMinutes()
    const secondsStr = date.getSeconds()
    return yearStr + '' + monthStr + '' + dateStr + '' + hourStr + '' + minutesStr + '' + secondsStr
  }
}
