import React from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import logoImg from 'images/logo.png'

const styles = StyleSheet.create({
  container: {
    flex: 3,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 210
  }
})

const Logo = () => (
  <View style={styles.container}>
    <Image source={logoImg} style={styles.image} />
  </View>
)

export default Logo
