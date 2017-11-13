import { LayoutAnimation } from 'react-native'

export const linear = {
  duration: 500,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    delay: 300,
    type: LayoutAnimation.Types.easeInEaseOut
  }
}
