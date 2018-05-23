import React, { Component } from 'react'
import styled from 'styled-components'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import TableImg from './TableImg'

export default ({
  rowNames,
  rows,
}) => (
  <Table>
    <TableHead>
      <TableRow>
        {rowNames.map((rowName, i) => (
          <TableCell key={i}>{rowName}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row, i) => (
        <TableRow key={i}>
          {row.map((value, i) => (
            <TableCell key={i}>{value}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
)
