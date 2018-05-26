import React, { Component } from 'react'

// Material UI
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

// Form helper lib
import { Formik } from 'formik';

// Helper
import {
  uploadFile
} from '../../../helpers'

// UI
import Img from '../../ui/Img'
import Label from '../../ui/Label'

export default class Form extends Component {
  constructor(props) {
    super(props)

    const {
      firebaseRef,
      data,
      dialogFormat,
      columns,
    } = props

    this.state = {
      imagesUrls: {},
      firebaseRef,
      data,
      dialogFormat,
      columns,
    }
  }

  updateOrCreateEntry = async (
    _values,
    setSubmitting,
    imagesUrls,
    submit,
  ) => {
    let values = { ..._values }
  
    Object.entries(values).forEach(([key, value]) => {
      Object.entries(imagesUrls).forEach(([_key, url]) => {
        if (key === _key) {
          values[key] = url
        }
      })
    })
  
    await submit(values)
  
    setSubmitting(false)
  }

  getFormData = ({
    key,
    value,
    typeOfKey,
  }, {
    setFieldValue,
    setSubmitting,
  }) => {
    const { firebaseRef } = this.state

    if (typeOfKey === 'string') {
      return (
        <div key={key}>
          <TextField
            label={key}
            value={value}
            onChange={event => {
              const { value } = event.target
              setFieldValue(key, value)
            }}
            margin="normal" />
        </div>
      )
    }

    if (typeOfKey === 'image') {
      return (
        <div key={key}>
          <Label>{key}</Label>
          <div>
            <Img src={this.state.imagesUrls[key] || value} />
          </div>
          <div>
            <Button
              variant="raised"
              containerElement='label'
              label='My Label'>
              <input type="file"
                name={key}
                onChange={async event => {
                  setSubmitting(true)

                  const url = await uploadFile(event, firebaseRef)

                  let imagesUrls = { ...this.state.imagesUrls }
                  imagesUrls[key] = url

                  this.setState({ imagesUrls })

                  setSubmitting(false)
                }} />
            </Button>
          </div>
        </div>
      )
    }

    if (typeOfKey === 'number') {
      return (
        <div key={key}>
          <TextField
            label={key}
            value={value}
            onChange={event => {
              const { value } = event.target
              setFieldValue(key, value)
            }}
            type="number"
            margin="normal" />
        </div>
      )
    }

    if (typeOfKey === 'boolean') {
      return (
        <div key={key}>
          <FormControlLabel
            control={
              <Checkbox
                checked={value}
                onChange={(event, checked) => {
                  setFieldValue(key, checked);
                }}
                color="primary"
                value="checkedB"
              />
            }
            label={key}
          />
        </div>
      )
    }
  }

  getInitialValues = () => {
    const {
      columns,
      data,
      dialogFormat,
    } = this.state

    const initialValues = { ...data }

    if (dialogFormat === 'create') {
      columns.forEach(({ name, type }) => {
        if (type === 'id')
          return
  
        if (type === 'string')
          initialValues[name] = ''
  
        if (type === 'number')
          initialValues[name] = 0
  
        if (type === 'boolean')
          initialValues[name] = false
  
        if (type === 'image')
          initialValues[name] = ''
      })
    }

    return initialValues
  }

  render() {
    const {
      columns,
      submit,
      dialogFormat,
    } = this.props

    const initialValues = this.getInitialValues()

    return (
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          const { imagesUrls } = this.state

          this.updateOrCreateEntry(
            values, 
            setSubmitting,
            imagesUrls,
            submit,
          )
        }}
        render={({
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setSubmitting,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              {Object.entries(values).map(([key, value]) => {
                const typeOfKey = columns.filter(({ name }) => {
                  return name === key
                })[0].type

                const nextFormComponent = this.getFormData({
                  key,
                  value,
                  typeOfKey,
                }, {
                  setFieldValue,
                  setSubmitting,
                })

                return nextFormComponent
              })}
              <Button
                variant="raised"
                type="submit"
                disabled={isSubmitting}
                color="primary">
                {dialogFormat === 'create'
                  ? 'create'
                  : 'save'}
              </Button>
            </form>
          )
        }}
      />
    )
  }
}