import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'

// import deviceLog from 'react-native-device-log'
import { getCache, setCache, removeCache } from 'utils'
import client from 'apolloClient'

import Root from 'Root'

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
  state = {
    checking: true,
    isLoggedin: false,
    currentUser: null
  }

  componentWillMount = async () => {
    // await removeCache('currentUser')
    const currentUser = await getCache('currentUser')
    this.setState({
      currentUser,
      checking: false,
      isLoggedin: !!(currentUser && currentUser.token)
    })
  }

  onLogin = (response) => {
    setCache('currentUser', {
      ...response.user,
      token: response.token
    }).then(() => {
      this.setState(state => ({ ...state, isLoggedin: true, currentUser: { ...response.user } }))
    })
  }

  onLogout = () => {
    const user = { email: this.state.currentUser.email }
    setCache('currentUser', {
      ...user,
      token: null
    }).then(() => {
      this.setState(state => ({ ...state, isLoggedin: false, currentUser: { ...user } }))
    })
  }

  render() {
    if (this.state.checking) {
      return null
    }

    return (
      <ApolloProvider client={client}>
        <Root {...this.state} onLogin={this.onLogin} onLogout={this.onLogout} />
      </ApolloProvider>
    )
  }
}

export default App
