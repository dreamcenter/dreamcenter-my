import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAdmin: false
  },
  mutations: {
    toAdmin (state, data) {
      state.isAdmin = data
    }
  },
  actions: {
  },
  modules: {
  }
})
