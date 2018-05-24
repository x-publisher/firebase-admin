import React, { Component, Fragment } from 'react'

import Table from './ui'

import {
  getByRef,
  updateByRef
} from '../../services/firebase/db'

import ChangeDialog from './ui/ChangeDialog'
import CreateDialog from './ui/CreateDialog'

import {
  isUrl,
  extractFirebaseDBObject as extract
} from '../../helpers'

// Relative UI components
import ButtonAdd from './ui/ButtonAdd'

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

  removeEntryButtonClick = id => {
    
  }

  handleCloseChangeDialog = () => {
    this.setState({ changeDialogIsOpen: false })
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

    console.log(data)

    // await updateByRef(`${ref}/${changingDataId}`, data)

    this.initializeData()
  }

  handleCloseCreateDialog = () => {
    this.setState({ createDialogIsOpen: false })
  }

  render() {
    const { columns } = this.props.config
    
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
      .filter(([key, value]) => (
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
          update={updateEntry} />
          
        <CreateDialog
          onClose={handleCloseCreateDialog}
          isOpen={createDialogIsOpen}
          columns={columns}
          create={createEntry} />

        <ButtonAdd
          onClick={this.createEntryButtonClick} />
      </Fragment>
    )
  }
}
