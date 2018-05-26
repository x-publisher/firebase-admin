import shortid from 'shortid'

// Storage services
import {
  upload
} from '../services/firebase/storage'

export const extractFirebaseDBObject = data => (
  Object.entries(data)
    .map(([ id, props]) => ({
      id, ...props
    }))
)

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
