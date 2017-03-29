import React from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'

import LoginError from 'Login/LoginError'
import BottomButton from 'shared/BottomButton'
import usernameImg from 'images/username.png'
import passwordImg from 'images/password.png'

import { colors } from 'styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end'
  },
  wrapper: {
    marginBottom: 20
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
  }
})

const LoginForm = ({ email, password, changeValue, onSubmit, loggingIn, error }) => (
  <View style={styles.container}>
    {error ? <LoginError /> : null}
    <View style={styles.wrapper}>
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
          value={password}
          secureTextEntry
        />
      </View>
    </View>
    <BottomButton
      backgroundColor={colors.blue}
      title={loggingIn ? '...LOGGAR IN...' : 'LOGGA IN'}
      onPress={() => !loggingIn && onSubmit()}
    />
  </View>
)

const { bool, string, func, shape } = React.PropTypes

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
