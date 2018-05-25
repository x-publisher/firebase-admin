import React, { Component } from 'react'

import TableData from '../TableData'

export default class Tickets extends Component {
  render() {
    const firebaseTableConfig = {
      ref: 'tickets',
      columns: [
        {
          name: 'id',
          type: 'id'
        }, {
          name: 'name',
          type: 'string'
        }, {
          name: 'numOfTicketsTotal',
          type: 'number'
        }, {
          name: 'active',
          type: 'boolean'
        }, {
          name: 'desc',
          type: 'string'
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
