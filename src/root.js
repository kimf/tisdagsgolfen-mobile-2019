import { Component } from 'react'
import { AppState, AsyncStorage, Platform, UIManager } from 'react-native'
import { Navigation } from 'react-native-navigation'
import OneSignal from 'react-native-onesignal'
import deviceLog from 'react-native-device-log'
import slowlog from 'react-native-slowlog'

import registerScreens from './screens'
import apolloClient from './apolloClient'
import configureStore from './configureStore'
import tabConfig from './tabConfig'
import { getLoggedInState } from './reducers/app'


const onReceived = (notification) => {
  deviceLog.debug('Notification received:', notification)
}

const onRegistered = (notifData) => {
  deviceLog.debug('Device has been registered for push notifications!', notifData)
}

const onIds = (device) => {
  deviceLog.debug('Device info: ', device)
}

const handleAppStateChange = (/* currentAppState */) => {
  // deviceLog.debug('currentAppState', currentAppState)
}

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

    slowlog(this, /.*/)

    if (Platform.OS === 'android') {
      // eslint-disable-next-line no-unused-expressions
      UIManager.setLayoutAnimationEnabledExperimental
      && UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    this.store = configureStore(apolloClient, () => this.startApp(apolloClient))
  }

  componentWillMount() {
    deviceLog.debug('componentWillMount')
    OneSignal.addEventListener('received', onReceived)
    OneSignal.addEventListener('opened', this.onOpened)
    OneSignal.addEventListener('registered', onRegistered)
    OneSignal.addEventListener('ids', onIds)
  }

  componentDidMount() {
    deviceLog.debug('componentDidMount')
    AppState.addEventListener('change', handleAppStateChange)
  }

  componentWillUnmount() {
    deviceLog.debug('componentWillUnmount')
    OneSignal.removeEventListener('received', onReceived)
    OneSignal.removeEventListener('opened', this.onOpened)
    OneSignal.removeEventListener('registered', onRegistered)
    OneSignal.removeEventListener('ids', onIds)
  }

  onOpened = (openResult) => {
    deviceLog.debug('Message: ', openResult.notification.payload.body)
    deviceLog.debug('Data: ', openResult.notification.payload.additionalData)
    deviceLog.debug('isActive: ', openResult.notification.isAppInFocus)
    // deviceLog.debug('openResult: ', openResult)
    const data = openResult.notification.payload.additionalData
    this.setState({ openedFromNotification: true, route: data.route, eventId: data.eventId })
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
