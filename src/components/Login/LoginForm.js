import React from 'react'
import { Image, StyleSheet, TextInput, View, KeyboardAvoidingView } from 'react-native'
import { bool, string, func } from 'prop-types'

import LoginError from 'Login/LoginError'
import TGText from 'shared/TGText'
import usernameImg from 'images/username.png'
import passwordImg from 'images/password.png'

import { colors } from 'styles'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    paddingBottom: 20,
    width: '100%'
  },
  input: {
    backgroundColor: colors.dark,
    width: '90%',
    height: 40,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    color: colors.white,
    fontFamily: 'System',
    paddingLeft: 50
  },
  inputWrapper: {
    marginBottom: 5
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 16,
    height: 16,
    left: 35,
    top: 12
  },
  loginButton: {
    paddingVertical: 16,
    backgroundColor: colors.blue,
    width: '90%',
    marginHorizontal: 20
  },
  loginButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.white
  }
})

const LoginForm = ({ email, password, changeValue, onSubmit, loggingIn, error }) => (
  <KeyboardAvoidingView behavior="position" style={styles.container}>
    {error ? <LoginError /> : null}

    <View style={styles.inputWrapper}>
      <Image source={usernameImg} style={styles.inlineImg} />
      <TextInput
        autoFocus
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={emailValue => changeValue({ email: emailValue })}
        onSubmitEditing={() => this.password.focus()}
        blurOnSubmit={false}
        value={email}
      />
    </View>
    <View style={styles.inputWrapper}>
      <Image source={passwordImg} style={styles.inlineImg} />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        returnKeyType={'go'}
        autoCorrect={false}
        ref={(c) => { this.password = c }}
        onChangeText={passwordValue => changeValue({ password: passwordValue })}
        onSubmitEditing={onSubmit}
        blurOnSubmit={false}
        value={password}
        secureTextEntry
      />
    </View>
    <TGText
      viewStyle={styles.loginButton}
      style={styles.loginButtonText}
      onPress={() => !loggingIn && onSubmit()}
    >
      {loggingIn ? '...LOGGAR IN...' : 'LOGGA IN'}
    </TGText>
  </KeyboardAvoidingView>
)

LoginForm.propTypes = {
  email: string,
  password: string,
  changeValue: func.isRequired,
  onSubmit: func.isRequired,
  loggingIn: bool.isRequired,
  error: bool
}

LoginForm.defaultProps = {
  email: '',
  password: '',
  error: false
}

export default LoginForm
