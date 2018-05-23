import firebase from './index'

export const getClubs = async () => (
  (await firebase.database().ref('clubs').once('value'))
    .val()
)
