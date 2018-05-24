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

import Img from './Img'

import {
  isUrl,
  extractFirebaseDBObject as extract,
} from '../../../helpers'

import {
  upload as storageUpload,
} from '../../../services/firebase/storage'

import shortid from 'shortid'

const Transition = props => (
  <Slide direction="up" {...props} />
)

const uploadFile = async (event, firebaseRef) => {
  const data = event.currentTarget.files[0]

  const metaData = {
    contentType: data.type,
    name: `${shortid.generate()}-${data.name}`
  }

  const url = await storageUpload(firebaseRef, {
    file:
    data, metaData
  })

  return url
}

class Form extends Component {
  state = {
    imagesUrls: {}
  }

  render() {
    const {
      columns,
      submit,
      upload,
      firebaseRef,
    } = this.props

    const initialValues = {}

    columns.forEach(({ name, type }) => {
      if (type !== 'id')
        initialValues[name] = ''
    })

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={async (_values, { setSubmitting }) => {
          const {
            imagesUrls
          } = this.state

          let values = { ..._values }

          Object.entries(values).map(([key, value]) => {
            Object.entries(imagesUrls).forEach(([_key, url]) => {
              if (key === _key) {
                values[key] = url
              }
            })
          })

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
                    <div key={key}>
                      <label htmlFor={key}>{key}</label>
                      <input
                        type="text"
                        value={value}
                        name={key}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        key={key} />
                    </div>
                  )
                }

                if (typeOfKey === 'image') {
                  return (
                    <div key={key}>
                      <Img src={value} />
                      <input
                        type="text"
                        value={this.state.imagesUrls[key] || ''}
                        readOnly />
                      <input
                        type="file"
                        name={key}
                        onChange={async event => {
                          const url = await uploadFile(event, firebaseRef)

                          let imagesUrls = { ...this.state.imagesUrls }
                          imagesUrls[key] = url

                          this.setState({ imagesUrls })
                        }} />
                    </div>
                  )
                }
              })}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )
        }}
      />
    )
  }
}

export default class CreateDialog extends Component {
  render() {
    const {
      isOpen,
      onClose,
      columns,
      create,
      uploadFile,
      firebaseRef,
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
            submit={create}
            upload={uploadFile}
            firebaseRef={firebaseRef} />
        </div>
      </Dialog>
    )
  }
}
