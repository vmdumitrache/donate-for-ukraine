import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/services/firebase'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      uid: null,
      displayName: null,
      email: null,
      photoURL: null,
      admin: false,
      loggedIn: false
    },
    snack: {
      text: '',
      type: 'primary'
    }
  },
  plugins: [new VuexPersistence().plugin],

  getters: {
    getUser (state) {
      return state.user
    },
    isLoggedIn (state) {
      return state.user.loggedIn
    },
    isAdmin (state) {
      return state.user.admin
    }
  },
  mutations: {
    SET_USER (state, user) {
      state.user = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        loggedIn: !!user.uid
      }
    },
    SET_ADMIN (state, value) {
      state.user.admin = value
    },
    SET_SNACK (state, snack) {
      const { text, type } = snack
      state.snack = { text, type }
    }
  },
  actions: {
    authAction ({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdTokenResult()
            .then((token) => {
              if (token.claims.admin !== undefined) {
                commit('SET_ADMIN', token.claims.admin)
              } else { commit('SET_ADMIN', false) }
            })

          commit('SET_USER', user)
        } else {
          commit('SET_USER', {
            uid: null,
            displayName: null,
            email: null,
            photoURL: null,
            admin: false,
            loggedIn: false
          })
        }
      })
    }
  }
})
