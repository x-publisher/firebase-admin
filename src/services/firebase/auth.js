import firebase from './index'

const auth = firebase.auth()

export const signInWithEmailAndPassword = (email, password) => (
  auth.signInWithEmailAndPassword(
    email, password
  )
)
