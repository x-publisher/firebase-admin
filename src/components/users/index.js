import React, { Component } from 'react'

import TableData from '../TableData'

export default class Users extends Component {
  render() {
    const firebaseTableConfig = {
      ref: 'users',
      columns: [
        {
          name: 'id',
          type: 'id'
        }, {
          name: 'username',
          type: 'string'
        }, {
          name: 'email',
          type: 'string'
        }, {
          name: 'city',
          type: 'string'
        }, {
          name: 'usertype',
          type: 'string'
        }, {
          name: 'objectId',
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
