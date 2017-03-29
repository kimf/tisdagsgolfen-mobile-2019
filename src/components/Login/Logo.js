import React from 'react'
import {
  StyleSheet,
  View,
  Image
} from 'react-native'

import logoImg from 'images/logo4.png'

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
    width: '100%'
  },
  image: {
    width: 150,
    height: 150
  }
})

const Logo = () => (
  <View style={styles.container}>
    <Image source={logoImg} style={styles.image} />
  </View>
)

export default Logo
