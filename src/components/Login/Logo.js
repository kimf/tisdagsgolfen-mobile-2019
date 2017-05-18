import React from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import logoImg from 'images/logo4.png'

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    alignItems: 'center',
    width: '100%'
  },
  image: {
    width: 180,
    height: 180
  }
})

const Logo = () => (
  <View style={styles.container}>
    <Image source={logoImg} style={styles.image} />
  </View>
)

export default Logo
