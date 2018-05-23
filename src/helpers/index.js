export const extractFirebaseDBObject = data => (
  Object.entries(data)
    .map(([ id, props]) => ({
      id, ...props
    }))
)
