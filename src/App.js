import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { MainStack } from 'routes'
import Login from 'screens/Login'

const App = ({ loggedIn }) => {
  if (!loggedIn) {
    return <Login />
  }

  return (
    <MainStack />
  )
}

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({ loggedIn: state.app.loggedIn })

export default connect(mapStateToProps)(App)
