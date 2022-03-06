import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import firebaseConfig from './firebaseConfig'
import store from '@/store'

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged((user) => {
  const { authUser, claims } = user.getCurrentUser.getIdTokenResult()
  console.log({ authUser, claims })
  store.dispatch('fetchUser', user)
})

export default firebase
