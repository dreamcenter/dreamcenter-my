import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAdmin: false,
    dynamicId: -1,
    dynamicContent: ''
  },
  mutations: {
    toAdmin (state, data) {
      state.isAdmin = data
    },
    changeDynamicId (state, data) {
      state.dynamicId = data
    },
    changeDynamicContent (state, data) {
      state.dynamicContent = data
    }
  },
  actions: {
  },
  modules: {
  }
})
