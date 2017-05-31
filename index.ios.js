import { AppRegistry } from 'react-native'
import { Sentry } from 'react-native-sentry'
import Config from 'react-native-config'

import Root from './src/Root'

// eslint-disable-next-line no-console
console.ignoredYellowBox = [
  // 'Warning: You are manually calling a React.PropTypes validation function for the',
  'Warning: BackAndroid is deprecated.  Please use BackHandler instead.',
  'Missing field scoringSession'
]

Sentry.config(Config.SENTRY_DSN, {
  autoBreadcrumbs: {
    xhr: false,
    console: true,
    dom: true,
    location: true
  }
}).install()

AppRegistry.registerComponent('Tisdagsgolfen', () => Root)

