import { AppRegistry } from 'react-native'
import { Sentry } from 'react-native-sentry'
import Config from 'react-native-config'
import Root from './src/Root'


Sentry.config(Config.SENTRY_DSN).install()

// eslint-disable-next-line no-console
console.ignoredYellowBox = [
  'Calling of `[-RCTUIManager setFrame:forView:]` which is deprecated.'
]

AppRegistry.registerComponent('Tisdagsgolfen', () => Root)
