const netUse = true

const appBkLoc = '/imgs/background.png'
const homeBkLoc = '/imgs/bk.jpeg'

const appBkNet = 'https://s-bj-2133-dreamcenter.oss.dogecdn.com/fast/background.png'
const homeBkNet = 'https://s-bj-2133-dreamcenter.oss.dogecdn.com/fast/bk.jpeg'

const tmpAppBk = netUse ? appBkNet : appBkLoc
const tmpHomeBk = netUse ? homeBkNet : homeBkLoc

export {
  tmpAppBk as appBk,
  tmpHomeBk as homeBk
}
