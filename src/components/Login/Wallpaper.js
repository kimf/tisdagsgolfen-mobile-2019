import React from 'react'
import { StyleSheet, Image } from 'react-native'

import bgSrc from 'images/wrapper.png'

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
})

const Wallpaper = ({ children }) => (
  <Image style={styles.picture} source={bgSrc}>
    {children}
  </Image>
)

const { oneOfType, arrayOf, node } = React.PropTypes

Wallpaper.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired
}

export default Wallpaper
