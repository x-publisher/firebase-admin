import React, { Component, Fragment } from 'react';
// DB service
import {
  getByRef,
  updateByRef,
  createByRef,
  removeByRef,
} from '../../services/firebase/db';
// Helpers
import {
  extractFirebaseDBObject as extract,
} from '../../helpers';
// Relative components
import Table from './Table';
import Dialog from './Dialog';
// UI
import ButtonAdd from '../ui/ButtonAdd';
import Progress from '../ui/Progress';

export default class TableData extends Component {
  state = {
    data: {},
    dialogIsOpen: false,
    changingDataId: null,
    dialogFormat: 'create', // create | change,
    isLoading: true,
    refDatas: [],
    refDatasContents: [],
  }

  componentDidMount = () => {
    this.initializeData();
  }

  initializeData = async () => {
    this.setState({ isLoading: true });

    const { ref } = this.props.config;

    let data = await getByRef(ref);
    data = await this.insertRefs(data);

    this.setState({
      data,
      isLoading: false,
    });
  }

  insertRefs = async (data) => {
    const { columns } = this.props.config;

    const refDatas = [];

    for (const { type, name } of columns) {
      if (typeof type === 'object') {
        if (type.type === 'refTo') {
          const ref = type.to;

          const refData = await getByRef(ref);

          refDatas.push({
            key: name,
            data: refData,
            name: ref,
          });

          this.setState({
            refDatas: [
              ...this.state.refDatas,
              ref,
            ],
          });
        }
      }
    }

    const newData = extract(data).map((_entry) => {
      const entry = { ..._entry };

      refDatas.forEach((refData) => {
        const { key, data } = refData;

        const keyData = entry[key];

        const newKeyData = {
          ...data[keyData],
          id: keyData,
        };

        entry[key] = newKeyData;
      });

      return entry;
    });

    this.setState({ refDatasContents: refDatas });

    const newDataObj = {};

    newData.forEach(({ id, ...rest }) => newDataObj[id] = rest);

    return newDataObj;
  }

  handleCloseDialog = () => {
    this.setState({
      dialogIsOpen: false,
      changingDataId: null,
    });
  }

  createEntryButtonClick = () => {
    this.setState({
      dialogIsOpen: true,
      dialogFormat: 'create',
    });
  }

  changeEntryButtonClick = (id) => {
    this.setState({
      dialogIsOpen: true,
      changingDataId: id,
      dialogFormat: 'change',
    });
  }

  removeEntryButtonClick = async (id) => {
    const { ref } = this.props.config;

    await removeByRef(`${ref}/${id}`);

    this.initializeData();
  }

  createEntry = async (data) => {
    const { ref } = this.props.config;

    await createByRef(ref, data);

    this.initializeData();

    this.handleCloseDialog();
  }

  updateEntry = async (data) => {
    const { ref } = this.props.config;
    const { changingDataId } = this.state;

    await updateByRef(`${ref}/${changingDataId}`, data);

    this.initializeData();

    this.handleCloseDialog();
  }

  formatChangingData = (
    changingDataId,
    data,
    columns,
  ) => {
    const changingDataObj = {};

    if (changingDataId) {
      Object.entries(data[changingDataId])
        .filter(([key]) => (
          columns.some(({ name }) => (
            key === name
          ))
        ))
        .forEach(([key, val]) => { changingDataObj[key] = val; });
    }

    return changingDataObj;
  }

  render() {
    const {
      refData,
    } = this.props;

    const {
      ref,
      columns,
    } = this.props.config;

    const {
      data,
      dialogIsOpen,
      changingDataId,

      dialogFormat,
      isLoading,

      refDatasContents,
    } = this.state;

    const {
      changeEntryButtonClick,
      removeEntryButtonClick,
      handleCloseDialog,
      updateEntry,
      createEntry,
      createEntryButtonClick,
    } = this;

    const submit = (
      dialogFormat === 'create'
        ? createEntry
        : updateEntry
    );

    const changingDataObj = this.formatChangingData(
      changingDataId,
      data,
      columns,
    );

    return (
      <Fragment>
        <Table
          columns={columns}
          data={data}
          change={changeEntryButtonClick}
          remove={removeEntryButtonClick}
          isLoading={isLoading}
          refData={refData}
        />

        <Dialog
          onClose={handleCloseDialog}
          isOpen={dialogIsOpen}
          changingData={changingDataObj}
          columns={columns}
          submit={submit}
          firebaseRef={ref}
          dialogFormat={dialogFormat}
          refData={refData}
          refDatasContents={refDatasContents}
        />

        <ButtonAdd
          disabled={isLoading}
          onClick={createEntryButtonClick}
        />

        {isLoading && <Progress />}
      </Fragment>
    );
  }
}
