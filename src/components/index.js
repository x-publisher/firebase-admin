import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { signInWithEmailAndPassword } from '../services/firebase/auth'

// UI
import Container from './ui/Container'

// DB configs
import dbData from '../config/dbData'
import refData from '../config/refData'

// Relative components
import Navbar from './Navbar'
import TableData from './TableData'

class App extends Component {
  componentDidMount = () => (
    // FOR TESTING
    signInWithEmailAndPassword(
      'jpacker@siu.edu',
      'Chasingdr3ams.'
    )
  )

  render() {
    const menuItems = dbData.map(({ ref }) => ref)

    return (
      <Router>
        <Fragment>
          <Navbar
            menuItems={menuItems} />
          <Container>
            <Route exact path="/" render={() => <div>home</div>} />
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
        </Fragment>
      </Router>
    )
  }
}

export default App
