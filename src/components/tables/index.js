import React, { Component } from 'react'

import TableData from '../TableData'

export default class Tables extends Component {
  render() {
    const firebaseTableConfig = {
      ref: 'tables',
      columns: [
        {
          name: 'id',
          type: 'id'
        }, {
          name: 'image',
          type: 'image'
        }, {
          name: 'name',
          type: 'string'
        }, {
          name: 'price',
          type: 'number'
        }, {
          name: 'desc',
          type: 'string'
        }, {
          name: 'numOfTablesTotal',
          type: 'number'
        }, {
          name: 'numOfTablesAvail',
          type: 'number'
        }, {
          name: 'seats',
          type: 'number'
        }, {
          name: 'bottlesIncluded',
          type: 'number'
        }, {
          name: 'ownerId',
          type: 'string'
        }
      ]
    }

    return (
      <div>
        <TableData
          config={firebaseTableConfig}
        />
      </div>
    )
  }
}
