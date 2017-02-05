import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { getCache, removeCache } from './utils'

import Login from './containers/Login'
import Home from './containers/Home'
import Loading from './components/Loading'

const backgroundColor = '#fff'

class TisdagsGolfen extends Component {
  state = { loggedIn: false }

  componentDidMount() {
    getCache('graphcoolToken').then(value => {
      this.setState({ loggedIn: value !== null });
    });
  }

  _afterLogin = () => {
    this.setState({ loggedIn: true })
  }

  _logout = () => {
    removeCache('graphcoolToken')
    this.setState({ loggedIn: false })
  }

  render () {
    const { data } = this.props;
    const { loggedIn } = this.state;

    if (data.loading)
      return <Loading />

    if (!data.user || !loggedIn)
      return <Login afterLogin={() => this._afterLogin() }/>

    return (
      <View style={{ flex: 1, backgroundColor, alignItems: 'stretch' }}>
        <Home user={data.user} loading={data.loading} logout={() => this._logout()} />
      </View>
    )
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
  }
`

export default graphql(userQuery)(TisdagsGolfen)
