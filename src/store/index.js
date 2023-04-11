import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAdmin: false,
    dynamicId: -1,
    dynamicContent: '',
    // for blog
    blogList: [], // [[page,data],[...]]
    blogPage: 1,
    blogTotalSize: 0,
    blogPageSize: 7,
    isPc: true,
    pagerCount: 5,
    nickname: ''
  },
  getters: {
    getBlogsByPage (state) {
      let data = []
      state.blogList.forEach(element => {
        if (element[0] === state.blogPage) {
          data = element[1]
        }
      })
      return data
    }
  },
  mutations: {
    toAdmin (state, data) {
      state.isAdmin = data
    },
    setNickname (state, data) {
      state.nickname = data
    },
    changeDynamicId (state, data) {
      state.dynamicId = data
    },
    changeDynamicContent (state, data) {
      state.dynamicContent = data
    },
    inserNewtBlogs (state, data) {
      let exist = false
      state.blogList.forEach((element) => {
        if (element[0] === state.blogPage) {
          exist = true
        }
      })
      if (!exist) {
        state.blogList.push(data)
      }
    },
    changeBlogTotalSize (state, data) {
      state.blogTotalSize = data
    },
    changeBlogPage (state, data) {
      state.blogPage = data
    },
    changePagerSize (state) {
      state.pagerCount = state.isPc ? 11 : 5
    }
  },
  actions: {
    getBlogList (context) {
      let exist = false
      this.state.blogList.forEach((element) => {
        if (element[0] === this.state.blogPage) {
          exist = true
        }
      })
      if (!exist) {
        axios.post('/api/blog/page',
        `pageNo=${this.state.blogPage}&pageSize=${this.state.blogPageSize}`).then(res => {
          context.commit('inserNewtBlogs', [this.state.blogPage, res.data.data])
        }).catch(err => err)
      }
    },
    getBlogTotalSize (context) {
      if (this.state.blogTotalSize === 0) {
        axios.get('/api/blog/count').then(res => {
          context.commit('changeBlogTotalSize', res.data.data)
          // context.commit('changeBlogTotalSize', 100)
        }).catch(err => err)
      }
    }
  },
  modules: {
  }
})
