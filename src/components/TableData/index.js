import React, { Component, Fragment } from 'react'

import Table from './Table'

import {
  getByRef,
  updateByRef,
  createByRef,
  removeByRef,
} from '../../services/firebase/db'

import {
  upload
} from '../../services/firebase/storage'

import Dialog from './Dialog'
import ButtonAdd from '../ui/ButtonAdd'

import {
  isUrl,
  extractFirebaseDBObject as extract
} from '../../helpers'

import shortid from 'shortid'

export default class TableData extends Component {
  state = {
    data: {},
    dialogIsOpen: false,
    changingDataId: null,
    dialogFormat: 'create', // create | change
  }

  componentDidMount = () => {
    this.initializeData()
  }

  initializeData = async () => {
    const { ref } = this.props.config

    const data = await getByRef(ref)

    this.setState({ data })
  }

  changeEntryButtonClick = id => {
    this.setState({
      dialogIsOpen: true,
      changingDataId: id,
      dialogFormat: 'change',
    })
  }

  removeEntryButtonClick = async id => {
    const { ref } = this.props.config

    await removeByRef(`${ref}/${id}`)

    this.initializeData()
  }

  handleCloseDialog = () => {
    this.setState({
      dialogIsOpen: false,
      changingDataId: null
    })
  }

  updateEntry = async data => {
    const { ref } = this.props.config
    const { changingDataId } = this.state

    await updateByRef(`${ref}/${changingDataId}`, data)

    this.initializeData()
  }

  createEntryButtonClick = () => {
    this.setState({
      dialogIsOpen: true,
      dialogFormat: 'create',
    })
  }

  createEntry = async data => {
    const { ref } = this.props.config

    await createByRef(ref, data)

    this.initializeData()
  }

  uploadFile = async (id, data, fieldName) => {
    const metaData = {
      contentType: data.type,
      name: `${shortid.generate()}-${data.name}`
    }
  
    const { ref } = this.props.config

    const url = await upload(`${ref}/${id}`, {
      file: data,
      metaData
    })

    await this.updateEntry({ [fieldName]: url })
  }

  render() {
    const {
      ref,
      columns,
    } = this.props.config
    
    const {
      data,
      dialogIsOpen,
      changingDataId,

      dialogFormat,
    } = this.state

    const {
      changeEntryButtonClick,
      removeEntryButtonClick,
      handleCloseDialog,
      updateEntry,

      createEntry,
    } = this

    let changingDataObj = {}

    changingDataId && Object.entries(data[changingDataId])
      .filter(([key]) => (
        columns.some(({ name }) => (
          key === name
        ))
      ))
      .forEach(([key, val]) => changingDataObj[key] = val)

    return (
      <Fragment>
        <Table
          columns={columns}
          data={data}
          change={changeEntryButtonClick}
          remove={removeEntryButtonClick} />

        <Dialog
          onClose={handleCloseDialog}
          isOpen={dialogIsOpen}
          changingData={changingDataObj}
          columns={columns}
          update={updateEntry}
          uploadFile={this.uploadFile}
          create={createEntry}
          firebaseRef={ref}
          dialogFormat={dialogFormat} />
          
        <ButtonAdd
          onClick={this.createEntryButtonClick} />
      </Fragment>
    )
  }
}
