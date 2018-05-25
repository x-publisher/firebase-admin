import isValidUrl from 'isurl'
import { upload } from '../services/firebase/storage'
import shortid from 'shortid'

export const extractFirebaseDBObject = data => (
  Object.entries(data)
    .map(([ id, props]) => ({
      id, ...props
    }))
)

export const isUrl = url => {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

export const uploadFile = async (event, firebaseRef) => {
  const data = event.currentTarget.files[0]

  const metaData = {
    contentType: data.type,
  }

  const url = await upload(`${firebaseRef}-${shortid.generate()}`, {
    file: data,
    metaData
  })

  return url
}
