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
              {isUrl(entry[name])
                ? <Img src={entry[name]} />
                : entry[name]}
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
