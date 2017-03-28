import React from 'react'
import { StyleSheet } from 'react-native'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const styles = StyleSheet.create({
  errorText: {
    backgroundColor: colors.red,
    width: '90%',
    padding: 10,
    marginHorizontal: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.white,
    marginBottom: 10
  }
})

const LoginError = () => (
  <TGText style={styles.errorText}>
    Något gick fel, se över infon
  </TGText>
)

export default LoginError
