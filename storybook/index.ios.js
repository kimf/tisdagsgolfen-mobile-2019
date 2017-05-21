import { AppRegistry } from 'react-native'
// eslint-disable-next-line import/no-extraneous-dependencies
import { getStorybookUI, configure } from '@storybook/react-native'

// import stories
configure(() => {
  require('./stories')
}, module)

const StorybookUI = getStorybookUI({ port: 7007, host: 'localhost' })
AppRegistry.registerComponent('Tisdagsgolfen', () => StorybookUI)
