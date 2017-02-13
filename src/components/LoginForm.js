import React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Dimensions
} from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -40,
    justifyContent: 'flex-end'
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    padding: 10,
    color: '#222',
    fontFamily: 'Avenir',
    marginBottom: 10
  },
  inputWrapper: {
    flex: 1
  }
})

const LoginForm = ({ email, password, changeValue, onSubmit }) =>
  <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <TextInput
      style={styles.input}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="email-address"
      returnKeyType="next"
      onChangeText={emailValue => changeValue({ email: emailValue })}
      onSubmitEditing={() => this.password.focus()}
      value={email}
    />
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
  </KeyboardAvoidingView>


const { string, func } = React.PropTypes

LoginForm.propTypes = {
  email: string,
  password: string,
  changeValue: func.isRequired,
  onSubmit: func.isRequired
}

LoginForm.defaultProps = {
  email: '',
  password: ''
}


export default LoginForm
