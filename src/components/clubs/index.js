import React, { Component } from 'react'

// Helpers
import { extractFirebaseDBObject as extract } from '../../helpers'

import { getClubs } from '../../services/firebase/db'

import Table from '../ui/Table'

export default class Clubs extends Component {
  state = {
    clubs: {}
  }

  componentDidMount = async () => {
    const clubs = await getClubs()
    this.setState({ clubs })

    console.log(
      clubs
    )
  }

  render() {
    const { clubs } = this.state

    const rowNames = [
      'id',
      'displayname',
      'image',
      'city',
      'desc'
    ]

    const rows = [
      extract(clubs).map(({
        id,
        displayname,
        image,
        city,
        desc
      }) => ([
        id,
        displayname,
        image,
        city,
        desc
      ]))
    ]

    console.log(rows)

    return (
      <div>
        <Table
          rowNames={rowNames}
          rows={rows} />
      </div>
    )
  }
}
