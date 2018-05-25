import React, { Component, Fragment } from 'react'

import Table from './ui'

import {
  getByRef,
  updateByRef,
  createByRef,
  removeByRef,
} from '../../services/firebase/db'

import {
  upload
} from '../../services/firebase/storage'

import ChangeDialog from './ui/ChangeDialog'
import CreateDialog from './ui/CreateDialog'

import {
  isUrl,
  extractFirebaseDBObject as extract
} from '../../helpers'

// Relative UI components
import ButtonAdd from './ui/ButtonAdd'

import shortid from 'shortid'

export default class TableData extends Component {
  state = {
    data: {},
    changeDialogIsOpen: false,
    changingDataId: null,
    
    createDialogIsOpen: false,
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
      changeDialogIsOpen: true,
      changingDataId: id
    })
  }

  removeEntryButtonClick = async id => {
    const { ref } = this.props.config

    await removeByRef(`${ref}/${id}`)

    this.initializeData()
  }

  handleCloseChangeDialog = () => {
    this.setState({
      changeDialogIsOpen: false,
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
      createDialogIsOpen: true,
    })
  }

  createEntry = async data => {
    const { ref } = this.props.config

    await createByRef(ref, data)

    this.initializeData()
  }

  handleCloseCreateDialog = () => {
    this.setState({ createDialogIsOpen: false })
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
    const { ref, columns } = this.props.config
    
    const {
      data,
      changeDialogIsOpen,
      changingDataId,

      createDialogIsOpen
    } = this.state

    const {
      changeEntryButtonClick,
      removeEntryButtonClick,
      handleCloseChangeDialog,
      updateEntry,

      handleCloseCreateDialog,
      createEntry
    } = this

    let changingDataObj = {}

    const changingData = changingDataId && Object.entries(data[changingDataId])
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

        <ChangeDialog
          onClose={handleCloseChangeDialog}
          isOpen={changeDialogIsOpen}
          changingData={changingDataObj}
          columns={columns}
          update={updateEntry}
          uploadFile={this.uploadFile}
          firebaseRef={ref} />
          
        <CreateDialog
          onClose={handleCloseCreateDialog}
          isOpen={createDialogIsOpen}
          columns={columns}
          create={createEntry}
          uploadFile={this.uploadFile}
          firebaseRef={ref} />

        <ButtonAdd
          onClick={this.createEntryButtonClick} />
      </Fragment>
    )
  }
}
