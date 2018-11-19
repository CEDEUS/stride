import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      userGroup: []
    }),
    mutations: {

    },
    actions: {

    },
    getters: {
      isAuthenticated (state) {
        return state.auth.loggedIn
      },
      loggedInUser (state) {
        return state.auth.user
      }
    }
  })
}

export default createStore
