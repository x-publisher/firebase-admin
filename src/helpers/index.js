import isValidUrl from 'isurl'

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
