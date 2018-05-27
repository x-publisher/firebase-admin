import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { signInWithEmailAndPassword } from '../services/firebase/auth'

// Material UI
import Typography from '@material-ui/core/Typography'

// UI
import Container from './ui/Container'

// Configs
import dbData from '../config/dbData'
import refData from '../config/refData'
import { authCreds } from '../config/firebase'

// Relative components
import Navbar from './Navbar'
import TableData from './TableData'
import ErrorCatcher from './ErrorCatcher'

class App extends Component {
  state = {
    hasError: false,
  }

  componentDidMount = () => {
    const {
      email,
      password,
    } = authCreds

    signInWithEmailAndPassword(
      email,
      password,
    )
  }

  componentDidCatch = (error, info) => {
    this.setState({ hasError: true })

    console.error(error)
    console.info('Error component stack: ', info)
  }

  render() {
    const {
      hasError,
    } = this.state

    const menuItems = dbData.map(({ ref }) => ref)

    return (
      <Router>
        <Fragment>
          <Navbar
            menuItems={menuItems} />
          <Container>
            <Route
              exact
              path="/"
              render={() => (
                <Typography>Select section from right left menu</Typography>
              )} />
            {dbData.map(config => (
              <Route
                path={`/${config.ref}`}
                render={() =>(
                  <TableData
                    config={config}
                    refData={refData} />
                )} />
            ))}
          </Container>
          {hasError && <ErrorCatcher />}
        </Fragment>
      </Router>
    )
  }
}

export default App
