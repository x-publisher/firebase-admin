import React, { Fragment } from 'react'

// Material UI
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

export default ({
  change,
  remove,
  id,
  isLoading,
}) => (
  <Fragment>
    <IconButton
      onClick={() => change(id)}
      aria-label="Edit"
      color="primary"
      disabled={isLoading}>
      <EditIcon />
    </IconButton>
    <IconButton
      onClick={() => remove(id)}
      aria-label="Delete"
      color="primary"
      disabled={isLoading}>
      <DeleteIcon />
    </IconButton>
  </Fragment>
)
