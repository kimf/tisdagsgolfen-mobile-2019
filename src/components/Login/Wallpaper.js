import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { oneOfType, arrayOf, node } from 'prop-types'

import bgSrc from 'images/wrapper.png'

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
})

const Wallpaper = ({ children }) => (
  <Image style={styles.picture} source={bgSrc}>
    {children}
  </Image>
)

Wallpaper.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired
}

export default Wallpaper
