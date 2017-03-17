import React from 'react'
import { View, StyleSheet } from 'react-native'

import TGText from 'shared/TGText'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    backgroundColor: 'rgba(255, 0, 0, 0.75)',
    width: '90%',
    padding: 10,
    marginHorizontal: 20,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 20
  }
})

const LoginError = () => (
  <View style={styles.container}>
    <TGText style={styles.errorText}>
      Något gick fel, se över infon
    </TGText>
  </View>
)

export default LoginError
