import React, { Component, PropTypes } from 'react'
import { Text, View, Image } from 'react-native'
import { Switch, Route, Redirect, withRouter } from 'react-router-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from './styles';
import { removeCache } from './utils'

import Profile from './components/Profile';
import Loading from './components/Loading';
import Login from './containers/Login';
import Home from './containers/Home';

const titleConfig = { title: 'TISDAGSGOLFEN', tintColor: 'white' };

const PrivateRoute = ({ component, user, ...rest }) => {
  return (
    <Route {...rest} user={user} render={props => (
      user ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )
}

class App extends Component {
  state = { loggedOut: false }

  _logout = () => {
    removeCache('graphcoolToken').then(() => {
      this.props.data.refetch();
    })
  }

  _login = () => {
    this.props.data.refetch();
  }

  render () {
    const { loading, error, user, seasons } = this.props.data;
    if (loading) {
      return <Loading text="Startar golfbilen..." />
    }

    return (
      <View style={styles.container}>
        <PrivateRoute user={user} path="/" component={Home} seasons={seasons} />
        <Switch>
          <PrivateRoute exact path="/profile" component={Profile} user={user} onLogout={this._logout}/>
          <Route exact path="/login" component={Login} user={user} onLogin={this._login}/>
        </Switch>
      </View>
    );
  }
}

const userQuery = gql`
  query {
    user {
      id
      email
      firstName
      lastName
    }
    seasons: allSeasons(orderBy: name_DESC) {
      id
      name
    }
  }
`

export default graphql(userQuery)(withRouter(App))
