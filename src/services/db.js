import firebase from './firebase'
import 'firebase/firestore'

const db = firebase.firestore()
db.enablePersistence()

export default db
