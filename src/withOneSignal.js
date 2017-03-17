import React, { Component } from 'react'
import { AppState, Platform, UIManager } from 'react-native'
import deviceLog from 'react-native-device-log'
import slowlog from 'react-native-slowlog'
import OneSignal from 'react-native-onesignal'

const onReceived = (notification) => {
  deviceLog.debug('Notification received:', notification)
}

const onRegistered = (notifData) => {
  deviceLog.debug('Device has been registered for push notifications!', notifData)
}

const onIds = (device) => {
  deviceLog.debug('Device info: ', device)
}

const handleAppStateChange = (currentAppState) => {
  deviceLog.debug('currentAppState', currentAppState)
}

const onOpened = (openResult) => {
  deviceLog.debug('Message: ', openResult.notification.payload.body)
  deviceLog.debug('Data: ', openResult.notification.payload.additionalData)
  deviceLog.debug('isActive: ', openResult.notification.isAppInFocus)
  // openResult.notification.payload.additionalData
}

const withOneSignal = WrappedComponent => (
  class WO extends Component {
    static navigatorButtons = WrappedComponent.navigatorButtons
    static navigatorStyle = WrappedComponent.navigatorStyle

    constructor(props) {
      super(props)

      slowlog(this, /.*/)

      if (Platform.OS === 'android') {
        // eslint-disable-next-line no-unused-expressions
        UIManager.setLayoutAnimationEnabledExperimental
          && UIManager.setLayoutAnimationEnabledExperimental(true)
      }
    }

    componentWillMount() {
      deviceLog.debug('componentWillMount')
      OneSignal.addEventListener('received', onReceived)
      OneSignal.addEventListener('opened', onOpened)
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
      OneSignal.removeEventListener('opened', onOpened)
      OneSignal.removeEventListener('registered', onRegistered)
      OneSignal.removeEventListener('ids', onIds)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
)

export default withOneSignal
