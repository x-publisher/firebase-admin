import React, { Component } from 'react'
import styled from 'styled-components'

// Material UI
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

// Inner components
import ManagementCell from './ManagementCell'

// UI components
import Img from '../ui/Img'

// Helpers
import { extractFirebaseDBObject as extract } from '../../../helpers'
import { isUrl } from '../../../helpers'

const getTableCellContent = (entry, name, columns) => {
  const typeOfKey = columns.filter(({ name: _name }) => (
    name === _name
  ))[0].type

  if (typeOfKey === 'id')
    return entry[name]

  if (typeOfKey === 'string')
    return entry[name]

  if (typeOfKey === 'image')
    return <Img src={entry[name]} />

  if (typeOfKey === 'boolean')
    return entry[name].toString()

  if (typeOfKey === 'number')
    return entry[name]

  return 'test'
}

export default ({
  columns,
  data,
  change,
  remove
}) => (
  <Table>
    <TableHead>
      <TableRow>
        {columns.map(({ name }, i) => (
          <TableCell key={i}>{name}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {extract(data).map((entry, i) => (
        <TableRow key={i}>
          {columns.map(({ name }, i) => (
            <TableCell key={i}>
              {getTableCellContent(entry, name, columns)}
            </TableCell>
          ))}
          <TableCell>
            <ManagementCell
              id={entry.id}
              change={change}
              remove={remove} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)
