import React, { Component } from 'react'
import { Platform, UIManager } from 'react-native'
import { ApolloProvider } from 'react-apollo'

// import deviceLog from 'react-native-device-log'
import { getCache } from './utils'
import client from './apolloClient'

import Root from './Root'

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

// import { LogView } from 'react-native-device-log'

// if (showLog) {
// return <LogView
// style={{ flex: 1 }}
// inverted={false}
// timeStampFormat="HH:mm:ss"
// multiExpanded
// />
// }

class App extends Component {
  constructor(props) {
    super(props)
    // TODO: This is the "withOneSignal" HoC
    if (Platform.OS === 'android') {
      // eslint-disable-next-line no-unused-expressions
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  state = {
    checking: true,
    isLoggedIn: false,
    currentUser: null
  }

  componentWillMount = async () => {
    // await removeCache('currentUser')
    const currentUser = await getCache('currentUser')
    this.setState({
      currentUser,
      checking: false,
      isLoggedIn: !!(currentUser && currentUser.token)
    })
  }

  render() {
    if (this.state.checking) {
      return null
    }

    return (
      <ApolloProvider client={client}>
        <Root {...this.state} />
      </ApolloProvider>
    )
  }
}

export default App
