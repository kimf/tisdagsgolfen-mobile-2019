import React, { Component, PropTypes } from 'react'
import { Text, View, Image } from 'react-native'
import { Switch, Route, Redirect, withRouter } from 'react-router-native'

import styles from './styles';
import { getCache, setCache } from './utils'

import Profile from './components/Profile';
import Loading from './components/Loading';
import Login from './containers/Login';
import Home from './containers/Home';

class App extends Component {
  state = { checkingLoggin: true, loggedOut: true, email: '' }

  componentDidMount() {
    getCache('currentUser').then((value) => {
      if(value && value.token) {
        this.setState({ checkingLoggin: false, loggedOut: false, email: value.email })
      } else {
        this.setState({ checkingLoggin: false, loggedOut: true, email: value.email })
      }
    });
  }

  _logout = (email) => {
    setCache('currentUser', {email}).then(() => {
      this.setState({loggedOut: true});
    })
  }

  _login = (email, token) => {
    setCache('currentUser', {email, token}).then(() => {
      this.setState({loggedOut: false});
    })
  }

  render () {
    if(this.state.checkingLoggin) { return <Loading text="Lägger pengar i rangemaskinen.." /> }
    if(this.state.loggedOut) { return <Login email={this.state.email} onLogin={this._login} /> }

    return (
      <View style={styles.container}>
        <Route path="/" component={Home} />
        <Switch>
          <Route exact path="/profile" component={Profile} onLogout={this._logout}/>
        </Switch>
      </View>
    );
  }
}


export default App
