import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import { signInWithEmailAndPassword } from '../services/firebase/auth'

import Clubs from './clubs'
import Bottles from './bottles'
import Users from './users'
import Tickets from './tickets'
import Tables from './tables'

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
          <Route path="/bottles" component={Bottles} />
          <Route path="/users" component={Users} />
          <Route path="/tickets" component={Tickets} />
          <Route path="/tables" component={Tables} />
        </Fragment>
      </Router>
    )
  }
}

export default App
