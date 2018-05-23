import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

export default ({
  change,
  remove,
  id
}) => (
  <Fragment>
    <button onClick={() => change(id)}>change</button>
    <button onClick={() => remove(id)}>delete</button>
  </Fragment>
)
