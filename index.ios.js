import { AppRegistry } from 'react-native'
import Root from './src/Root'

// eslint-disable-next-line no-console
console.ignoredYellowBox = [
  'Warning: You are manually calling a React.PropTypes validation function for the'
]

AppRegistry.registerComponent('Tisdagsgolfen', () => Root)

