import React, { Component, Fragment } from 'react'

// DB service
import {
  getByRef,
  updateByRef,
  createByRef,
  removeByRef,
} from '../../services/firebase/db'

// Relative components
import Table from './Table'
import Dialog from './Dialog'

// UI
import ButtonAdd from '../ui/ButtonAdd'
import Progress from '../ui/Progress'

export default class TableData extends Component {
  state = {
    data: {},
    dialogIsOpen: false,
    changingDataId: null,
    dialogFormat: 'create', // create | change,
    isLoading: true,
  }

  componentDidMount = () => {
    this.initializeData()
  }

  initializeData = async () => {
    this.setState({ isLoading: true })

    const { ref } = this.props.config

    const data = await getByRef(ref)

    this.setState({ data })

    this.setState({ isLoading: false })
  }

  handleCloseDialog = () => {
    this.setState({
      dialogIsOpen: false,
      changingDataId: null
    })
  }

  createEntryButtonClick = () => {
    this.setState({
      dialogIsOpen: true,
      dialogFormat: 'create',
    })
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

  createEntry = async data => {
    const { ref } = this.props.config

    await createByRef(ref, data)

    this.initializeData()

    this.handleCloseDialog()
  }

  updateEntry = async data => {
    const { ref } = this.props.config
    const { changingDataId } = this.state

    await updateByRef(`${ref}/${changingDataId}`, data)

    this.initializeData()

    this.handleCloseDialog()
  }

  formatChangingData = (
    changingDataId,
    data,
    columns,
  ) => {
    let changingDataObj = {}

    changingDataId && Object.entries(data[changingDataId])
    .filter(([key]) => (
      columns.some(({ name }) => (
        key === name
      ))
    ))
    .forEach(([key, val]) => changingDataObj[key] = val)

    return changingDataObj
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
      isLoading,
    } = this.state

    const {
      changeEntryButtonClick,
      removeEntryButtonClick,
      handleCloseDialog,
      updateEntry,
      createEntry,
      createEntryButtonClick,
    } = this

    const submit = (
      dialogFormat === 'create'
        ? createEntry
        : updateEntry
    )

    const changingDataObj = this.formatChangingData(
      changingDataId,
      data,
      columns,
    )

    return (
      <Fragment>
        <Table
          columns={columns}
          data={data}
          change={changeEntryButtonClick}
          remove={removeEntryButtonClick}
          isLoading={isLoading} />

        <Dialog
          onClose={handleCloseDialog}
          isOpen={dialogIsOpen}
          changingData={changingDataObj}
          columns={columns}
          submit={submit}
          firebaseRef={ref}
          dialogFormat={dialogFormat} />
          
        <ButtonAdd
          disabled={isLoading}
          onClick={createEntryButtonClick} />

        {isLoading && <Progress />}
      </Fragment>
    )
  }
}
