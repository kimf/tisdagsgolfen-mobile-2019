import React from 'react'
import { StyleSheet } from 'react-native'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const styles = StyleSheet.create({
  errorText: {
    backgroundColor: 'rgba(255, 0, 0,0.1)',
    width: '90%',
    padding: 8,
    marginHorizontal: '5%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.red,
    marginBottom: 10
  }
})

const LoginError = () => <TGText style={styles.errorText}>Något gick fel, se över infon</TGText>

export default LoginError
