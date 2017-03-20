import { LayoutAnimation } from 'react-native'

export const spring = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200 // 0.7
  }
}
export const ease = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.scaleXY
  },
  update: {
    delay: 100,
    type: LayoutAnimation.Types.easeInEaseOut
  }
}
