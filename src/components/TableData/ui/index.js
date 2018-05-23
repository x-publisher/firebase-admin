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
  rowsNames,
  data,
  change,
  remove
}) => (
  <Table>
    <TableHead>
      <TableRow>
        {rowsNames.map((rowName, i) => (
          <TableCell key={i}>{rowName}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {extract(data).map((rowData, i) => (
        <TableRow key={i}>
          {rowsNames.map((rowName, i) => (
            <TableCell key={i}>
              {isUrl(rowData[rowName])
                ? <Img src={rowData[rowName]} />
                : rowData[rowName]}
            </TableCell>
          ))}
          <TableCell>
            <ManagementCell
              id={rowData.id}
              change={change}
              remove={change} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)
