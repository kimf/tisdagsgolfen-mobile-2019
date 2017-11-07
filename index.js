import { AppRegistry } from 'react-native'

import App from './src/App'

if (__DEV__) {
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
}

// eslint-disable-next-line no-console
console.ignoredYellowBox = [
  // 'Warning: You are manually calling a React.PropTypes validation function for the',
  'Warning: BackAndroid is deprecated.  Please use BackHandler instead.',
  'Missing field scoringSession'
]

AppRegistry.registerComponent('Tisdagsgolfen', () => App)
