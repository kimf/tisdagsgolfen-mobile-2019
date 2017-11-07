import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { shape } from 'prop-types'
// import deviceLog from 'react-native-device-log'

import { getCache /* , removeCache */ } from 'utils'
import client from 'apolloClient'

import Login from 'screens/Login'
import RootStack from 'routes'

// deviceLog
//   .init(AsyncStorage, {
//     logToConsole: false,
//     logRNErrors: true,
//     maxNumberToRender: 0,
//     maxNumberToPersist: 100
//   })
//   .then(() => {
//     deviceLog.success('logger initialized')
//   })

class App extends Component {
  state = { checking: true, loggedIn: false }

  componentWillMount = async () => {
    // await removeCache('currentUser')
    const currentUser = await getCache('currentUser')
    this.setState({ checking: false, loggedIn: currentUser && currentUser.token })
  }

  render() {
    const { checking, loggedIn } = this.state
    if (checking) {
      return null
    }

    if (!loggedIn) {
      return (
        <ApolloProvider client={client}>
          <Login />
        </ApolloProvider>
      )
    }

    return (
      <ApolloProvider client={client}>
        <RootStack />
      </ApolloProvider>
    )
  }
}

export default App
