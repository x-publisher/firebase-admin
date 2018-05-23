import React, { Component } from 'react'

// Helpers
import { extractFirebaseDBObject as extract } from '../../helpers'

import { getClubs } from '../../services/firebase/db'

import TableData from '../TableData'

export default class Clubs extends Component {
  render() {
    const firebaseTableConfig = {
      ref: 'clubs',
      rowNames: [
        'id',
        'displayname',
        'image',
        'city',
        'desc'
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
