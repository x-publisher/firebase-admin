import React, { Component } from 'react'

// Material UI
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

// Form helper lib
import { Formik } from 'formik';

// Helper
import {
  uploadFile,
  extractFirebaseDBObject as extract,
} from '../../../helpers'

// UI
import Img from '../../ui/Img'
import Label from '../../ui/Label'
import FormControl from '../../ui/FormControl'

export default class Form extends Component {
  constructor(props) {
    super(props)

    const {
      firebaseRef,
      data,
      dialogFormat,
      columns,

      refData,
      refDatasContents,
    } = props

    this.state = {
      imagesUrls: {},
      firebaseRef,
      data,
      dialogFormat,
      columns,

      refData,
      refDatasContents,
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

    if (typeof typeOfKey === 'object') {
      if (typeOfKey.type === 'refTo') {
        const {
          refData,
          refDatasContents,
          dialogFormat,
        } = this.state

        const ref = typeOfKey.to

        const keyToShow = refData.filter((({ name }) => (
          name === ref
        )))[0].showInTable

        const targetData = refDatasContents.filter(({ name }) => (
          name === ref
        ))[0].data

        const extractedData = extract(targetData)

        return (
          <div key={key}>
            <FormControl>
              <InputLabel
                htmlFor={key}>
                {key}
              </InputLabel>
              <Select
                value={value.id || ''}
                defaultValue={value.id}
                inputProps={{
                  name: key,
                  id: key,
                }}
                onChange={event => {
                  const { value } = event.target

                  const newValue = extractedData.filter(({ id }) => (
                    id === value
                  ))[0]

                  setFieldValue(key, newValue)
                }}
              >
                {extractedData.map(entry => (
                  <MenuItem
                    value={entry.id}>
                    {entry[keyToShow]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )
      }
    }
  }

  getInitialValues = () => {
    const {
      columns,
      data,
      dialogFormat,
    } = this.state

    const initialValues = { ...data }

    columns.forEach(({ name, type }) => {
      if (typeof type === 'object') {
        if (type.type === 'refTo') {
          return initialValues[name]
        }
      }
    })

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

        if (typeof type === 'object') {
          if (type.type === 'refTo') {
            initialValues[name] = ''
          }
        }
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
        onSubmit={(_values, { setSubmitting }) => {
          const {
            imagesUrls,
            refData,
          } = this.state

          let values = { ..._values }

          columns.forEach(({ name, type }) => {
            if (typeof type === 'object') {
              if (type.type === 'refTo') {
                const ref = type.to

                const keyToShow = refData.filter((({ name }) => (
                  name === ref
                )))[0].showInTable

                values[name] = values[name].id
              }
            }
          })

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