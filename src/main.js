import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './css/common.css'
import './css/iconfont.css'
// import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/styles/androidstudio.css'

import { getNowTime } from './js/util'
import cookie from 'vue-cookies'
import axios from 'axios'
import { Pagination } from 'element-ui'
import xss from 'xss'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.timeout = 10000
axios.interceptors.request.use((config) => {
  nprogress.start()
  const token = sessionStorage.getItem('token')
  if (token) config.headers.Authorization = token
  return config
})
axios.interceptors.response.use(response => {
  nprogress.done()
  return response
})

Vue.config.productionTip = false
Vue.prototype.$cookie = cookie
Vue.prototype.$time = getNowTime
Vue.prototype.$xss = xss

Vue.use(Pagination)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
