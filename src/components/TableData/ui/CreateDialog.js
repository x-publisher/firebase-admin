import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

import { Formik } from 'formik';

import {
  isUrl,
  extractFirebaseDBObject as extract
} from '../../../helpers'

const Transition = props => (
  <Slide direction="up" {...props} />
)

const Form = ({
  columns,
  submit
}) => {
  const initialValues = {}

  columns.forEach(({ name, type }) => {
    if (type !== 'id')
      initialValues[name] = ''
  })
  
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        await submit(values)

        setSubmitting(false)
      }}
      render={({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            {Object.entries(values).map(([key, value]) => {
              const typeOfKey = columns.filter(({ name, type }) => (
                name === key
              ))[0].type

              if (typeOfKey === 'string') {
                return (
                  <Fragment key={key}>
                    <label htmlFor={key}>{key}</label>
                    <input
                      type="text"
                      value={value}
                      name={key}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      key={key} />
                  </Fragment>
                )
              }

              if (typeOfKey === 'image') {
                return <div>image here</div>
              }
            })}

            {/* {Object.entries(values).map(([key, value]) => {
              if (isUrl(value)) {
                return <div key={key}>img here</div>
              }

              return (
                <input
                  type="text"
                  value={value}
                  name={key}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  key={key} />
              )
            })} */}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )
      }}
    />
  )
}

export default class CreateDialog extends Component {
  render() {
    const {
      isOpen,
      onClose,
      columns,
      create
    } = this.props

    return (
      <Dialog
        fullScreen
        open={isOpen}
        onClose={this.onClose}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar>
            <IconButton color="inherit" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Sound
            </Typography>
            <Button color="inherit" onClick={onClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div
          style={{
            marginTop: 64
          }}>
          <Form
            columns={columns}
            submit={create} />
        </div>
      </Dialog>
    )
  }
}
