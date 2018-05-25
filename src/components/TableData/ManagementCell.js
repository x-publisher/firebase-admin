import React, { Fragment } from 'react'

// Material UI
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

export default ({
  change,
  remove,
  id
}) => (
  <Fragment>
    <IconButton
      onClick={() => change(id)}
      aria-label="Edit"
      color="primary">
      <EditIcon />
    </IconButton>
    <IconButton
      onClick={() => remove(id)}
      aria-label="Delete"
      color="primary">
      <DeleteIcon />
    </IconButton>
  </Fragment>
)
