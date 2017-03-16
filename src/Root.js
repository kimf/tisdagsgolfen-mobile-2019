import { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Navigation } from 'react-native-navigation'
import deviceLog from 'react-native-device-log'

import registerScreens from 'screens'
import apolloClient from 'apolloClient'
import configureStore from 'configureStore'
import tabConfig from 'tabConfig'
import { getLoggedInState } from 'actions/app'

deviceLog.init(AsyncStorage, {
  logToConsole: false,
  logRNErrors: true,
  maxNumberToRender: 0,
  maxNumberToPersist: 100
}).then(() => {
  deviceLog.success('logger initialized')
})

class Root extends Component {
  constructor(props) {
    super(props)
    this.store = configureStore(apolloClient, () => this.startApp(apolloClient))
  }

  onStoreUpdate = () => {
    const { loggedIn } = this.store.getState().app

    if (this.loggedIn !== loggedIn) {
      this.loggedIn = loggedIn
      this.needsToCheckLogin = false
      this.startApp(apolloClient)
    }
  }

  store = null
  needsToCheckLogin = true
  loggedIn = null

  startApp = (client) => {
    registerScreens(this.store, client)
    this.store.subscribe(this.onStoreUpdate)

    if (this.needsToCheckLogin) {
      this.store.dispatch(getLoggedInState())
    } else if (this.loggedIn) {
      Navigation.startTabBasedApp(tabConfig)
    } else {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'tisdagsgolfen.Login',
          navigatorStyle: {
            navBarHidden: true
          },
          animationType: 'fade'
        }
      })
    }
  }
}


export default Root
