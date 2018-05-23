import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { signInWithEmailAndPassword } from '../services/firebase/auth'

import Clubs from './clubs'

class App extends Component {
  componentDidMount = () => (
    // FOR TESTING
    signInWithEmailAndPassword(
      'jpacker@siu.edu',
      'Chasingdr3ams.'
    )
  )

  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" render={() => <div>home</div>} />
          <Route path="/venues" component={Clubs} />
        </Fragment>
      </Router>
    )
  }
}

export default App
