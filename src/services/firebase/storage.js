import firebase from './index'

const storage = firebase.storage()

export const upload = async (ref, { file, metaData }) => {
  const snap = await storage.ref(ref).put(file, metaData)
  return await snap.ref.getDownloadURL()
}
