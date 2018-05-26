import React, { Component } from 'react'

// Material UI
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

// Relative components
import Form from './Form'

// UI
import DialogBodyContainer from '../../ui/DialogBodyContainer'
import Transition from '../../ui/SlideUp'

export default class DialogComponent extends Component {
  render() {
    const {
      isOpen,
      onClose,
      changingData,
      columns,
      submit,
      firebaseRef,
      dialogFormat
    } = this.props

    return (
      <Dialog
        fullScreen
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar>
            <IconButton color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogBodyContainer>
          <Form
            data={changingData}
            columns={columns}
            submit={submit}
            firebaseRef={firebaseRef}
            dialogFormat={dialogFormat} />
        </DialogBodyContainer>
      </Dialog>
    )
  }
}
