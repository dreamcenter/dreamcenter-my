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
// import { Pagination } from 'element-ui'
import xss from 'xss'
import md5 from 'js-md5'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// axios.defaults.timeout = 10000
axios.interceptors.request.use((config) => {
  nprogress.start()
  const token = sessionStorage.getItem('token')
  if (token) config.headers.Authorization = token
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use(response => {
  nprogress.done()
  return response
}, err => {
  return Promise.reject(err)
})

Vue.config.productionTip = false
Vue.prototype.$cookie = cookie
Vue.prototype.$time = getNowTime
Vue.prototype.$xss = xss
Vue.prototype.$md5 = md5

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
