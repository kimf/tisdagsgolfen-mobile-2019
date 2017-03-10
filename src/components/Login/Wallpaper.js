import React from 'react'
import { StyleSheet, Image } from 'react-native'

import bgSrc from 'images/wrapper.jpg'

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
})

const Wallpaper = ({ children }) =>
  <Image style={styles.picture} source={bgSrc}>
    {children}
  </Image>


Wallpaper.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element)
}

Wallpaper.defaultProps = {
  children: []
}

export default Wallpaper
