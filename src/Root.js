import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import deviceLog from 'react-native-device-log'

import apolloClient from 'apolloClient'
import configureStore from 'configureStore'

import App from './App'

deviceLog.init(AsyncStorage, {
  logToConsole: false,
  logRNErrors: true,
  maxNumberToRender: 0,
  maxNumberToPersist: 100
}).then(() => {
  deviceLog.success('logger initialized')
})

class Root extends Component {
  state = { hasLoaded: false }
  store = configureStore(apolloClient, () => { this.setState({ hasLoaded: true }) })

  render() {
    const { hasLoaded } = this.state

    if (!hasLoaded) {
      return null
    }

    return (
      <ApolloProvider client={apolloClient} store={this.store}>
        <App />
      </ApolloProvider>
    )
  }
}

export default Root
