import React, { Component, Fragment } from 'react'

import Table from './ui'

import {
  getByRef,
  updateByRef
} from '../../services/firebase/db'

import Dialog from './ui/Dialog'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'

import {
  isUrl,
  extractFirebaseDBObject as extract
} from '../../helpers'

export default class TableData extends Component {
  state = {
    data: {},
    dialogIsOpen: false,
    changingDataId: null
  }

  componentDidMount = async () => {
    const { ref } = this.props.config

    const data = await getByRef(ref)
    
    this.setState({ data })
  }

  changeEntry = id => {
    this.setState({
      dialogIsOpen: true,
      changingDataId: id
    })
  }

  removeEntry = id => {
    this.setState({
      dialogIsOpen: true,
      changingDataId: id
    })
  }

  handleCloseDialog = () => {
    this.setState({ dialogIsOpen: false })
  }

  update = data => {
    const { ref } = this.props.config
    const { changingDataId } = this.state

    updateByRef(`${ref}/${changingDataId}`, data)
  }

  render() {
    const { rowNames } = this.props.config
    
    const {
      data,
      dialogIsOpen,
      changingDataId
    } = this.state

    const {
      changeEntry,
      removeEntry,
      handleCloseDialog,
      update
    } = this

    let changingDataObj = {}
    
    const changingData = changingDataId && Object.entries(data[changingDataId])
      .filter(([key, value]) => (
        rowNames.some(rowName => (
          key === rowName
        ))
      ))
      .forEach(([key, val]) => changingDataObj[key] = val)

    return (
      <Fragment>
        <Table
          rowsNames={rowNames}
          data={data}
          change={changeEntry}
          remove={removeEntry} />
        <Dialog
          onClose={handleCloseDialog}
          isOpen={dialogIsOpen}
          changingData={changingDataObj}
          rowNames={rowNames}
          update={update} />
        <Button variant="fab" color="primary">
          <AddIcon />
        </Button>
      </Fragment>
    )
  }
}
