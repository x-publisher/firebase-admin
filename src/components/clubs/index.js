import React, { Component } from 'react'

// Helpers
import { extractFirebaseDBObject as extract } from '../../helpers'

import { getClubs } from '../../services/firebase/db'

import TableData from '../TableData'

export default class Clubs extends Component {
  render() {
    const firebaseTableConfig = {
      ref: 'clubs',
      columns: [
        {
          name: 'id',
          type: 'id'
        }, {
          name: 'displayname',
          type: 'string'
        }, {
          name: 'image',
          type: 'image'
        }, {
          name: 'city',
          type: 'string'
        }, {
          name: 'desc',
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
