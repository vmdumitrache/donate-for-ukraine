import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import firebaseConfig from './firebaseConfig'

firebase.initializeApp(firebaseConfig)

if (location.hostname === 'localhost') {
  // const db = firebase.firestore()
  // const auth = firebase.auth()

  firebase.auth().useEmulator('http://localhost:9099')
  firebase.firestore().useEmulator('localhost', 8181)
}

export default firebase
