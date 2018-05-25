import React, { Component } from 'react'

import TableData from '../TableData'

export default class Bottles extends Component {
  render() {
    const firebaseTableConfig = {
      ref: 'bottles',
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
          name: 'size',
          type: 'string'
        }, {
          name: 'cost',
          type: 'string'
        }, {
          name: 'status',
          type: 'boolean'
        }, {
          name: 'price',
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
