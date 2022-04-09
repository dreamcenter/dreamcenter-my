import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './css/common.css'
import './css/iconfont.css'
// import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/styles/androidstudio.css'

import { getNowTime } from './js/util'
import * as echarts from 'echarts'
import cookie from 'vue-cookies'
import axios from 'axios'
import { Pagination } from 'element-ui'
import xss from 'xss'

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) config.headers.Authorization = token
  return config
})

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$cookie = cookie
Vue.prototype.$time = getNowTime
Vue.prototype.$xss = xss

Vue.use(Pagination)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
