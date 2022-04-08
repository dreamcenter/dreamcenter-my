function getNowTime () {
  var time = new Date()
  var target = time.getFullYear() + '-'
  target += toDouble(time.getMonth() + 1) + '-'
  target += toDouble(time.getDate()) + ' '
  target += toDouble(time.getHours()) + ':'
  target += toDouble(time.getMinutes()) + ':'
  target += toDouble(time.getSeconds())
  return target
}

function toDouble (num) {
  return num > 9 ? num : '0' + num
}

export { getNowTime }
