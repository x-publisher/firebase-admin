import firebase from './index'

const db = firebase.database()

export const getByRef = async ref => (
  (await db.ref(ref).once('value')).val()
)

export const updateByRef = async (ref, data) => (
  db.ref(ref).update(data)
)

export const createByRef = async (ref, data) => (
  db.ref(ref).push().set(data)
)

export const removeByRef = async ref => (
  db.ref(ref).remove()
)
