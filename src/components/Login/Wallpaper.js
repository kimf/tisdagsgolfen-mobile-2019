import React from 'react'
import { StyleSheet, ImageBackground } from 'react-native'
import { oneOfType, arrayOf, node } from 'prop-types'

import bgSrc from 'images/wrapper.png'

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
})

const Wallpaper = ({ children }) => (
  <ImageBackground style={styles.picture} source={bgSrc}>
    {children}
  </ImageBackground>
)

Wallpaper.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
}

export default Wallpaper
