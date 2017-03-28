import React from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import logoImg from 'images/logo4.png'

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    alignItems: 'center',
    width: '100%',
    height: '50%'
  },
  image: {
    width: 200,
    height: 200
  }
})

const Logo = () => (
  <View style={styles.container}>
    <Image source={logoImg} style={styles.image} />
  </View>
)

export default Logo
