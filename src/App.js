import React, { Component } from 'react'
import { bool } from 'prop-types'

import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import { withMainQuery, mainQueryProps } from 'queries/mainQuery'

import RootStack from 'routes'
import Login from 'screens/Login'
import Loading from 'shared/Loading'

class App extends Component {
  static propTypes = {
    data: mainQueryProps,
    loggedIn: bool.isRequired
  }

  static defaultProps = {
    data: {
      loading: true,
      user: null,
      seasons: null
    }
  }

  render() {
    const { data, loggedIn } = this.props
    if (!loggedIn) {
      return <Login />
    }

    if (data.loading) {
      return <Loading text="loading" />
    }

    return <RootStack />
  }
}

const mapStateToProps = state => ({ loggedIn: state.app.loggedIn })

export default compose(connect(mapStateToProps), withMainQuery)(App)
