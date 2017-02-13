import React from 'react'
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View
} from 'react-native'

import usernameImg from '../../images/username.png'
import passwordImg from '../../images/password.png'

const DEVICE_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -40,
    justifyContent: 'flex-end'
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    color: '#fff',
    fontFamily: 'Avenir',
    marginBottom: 10,
    paddingLeft: 50
  },
  inputWrapper: {
    flex: 1
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9
  }
})

const LoginForm = ({ email, password, changeValue, onSubmit }) =>
  <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <View style={styles.inputWrapper}>
      <Image source={usernameImg} style={styles.inlineImg} />
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