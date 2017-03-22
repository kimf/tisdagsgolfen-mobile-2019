import { AppRegistry } from 'react-native'
import Root from './src/Root'

// eslint-disable-next-line no-console
console.ignoredYellowBox = [
  'Calling of `[-RCTUIManager setFrame:forView:]` which is deprecated.'
]

AppRegistry.registerComponent('Tisdagsgolfen', () => Root)

