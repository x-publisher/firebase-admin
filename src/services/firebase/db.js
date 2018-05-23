import firebase from './index'

const db = firebase.database()

export const getByRef = async ref => (
  (await db.ref(ref).once('value')).val()
)

export const updateByRef = async (ref, data) => (
  db.ref(ref).update(data)
)
