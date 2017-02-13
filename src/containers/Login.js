import React, {Component, PropTypes} from "react";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  View,
  LayoutAnimation
} from "react-native";
import { Switch, Route, Redirect } from 'react-router-native'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Loading from '../components/Loading'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.email || '',
      password: '',
      loggingIn: false,
      error: null
    }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ showingKeyboard: true });
  }

  _keyboardDidHide = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ showingKeyboard: false });
  }

  onSubmit = () => {
    this.setState({ loggingIn: true });
    const { email, password } = this.state;
    this.props.signinUser({ variables: { email, password } })
      .then(response => {
        this.props.onLogin(email, response.data.signinUser.token);
        this.setState({ loggingIn: false });
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.warn(e)
        this.setState({ error: e, loggingIn: false });
      })
  }

  openPassword = () => {
    Linking.openURL('https://www.tisdagsgolfen.se/password_resets/new');
  }


  render() {
    const { loggingIn, error, showingKeyboard } = this.state;

    let showError;
    if(error) {
      showError = <Text style={{color: '#c00', fontSize: 20}}>Något gick fel, se över infon</Text>;
    }

    return(
      <View style={{
        flex: 1,
        paddingTop: 60,
        backgroundColor: '#ccc',
        alignItems: 'center'
      }}>

        { !showingKeyboard ? <Image source={require('../images/logo.png')} style={styles.logo} /> : null }

        {showError}

        <Text style={styles.label}>E-post</Text>
        <TextInput
          style={styles.inputField}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          ref="email"
          returnKeyType="next"
          onChangeText={(email) => this.setState({email})}
          onSubmitEditing={(event) => {
            this.refs.password.focus();
          }}
          value={this.state.email}
        />

        <Text style={styles.label}>Lösenord</Text>
        <TextInput
          style={styles.inputField}
          autoCapitalize="none"
          secureTextEntry={true}
          returnKeyType={'go'}
          autoCorrect={false}
          ref="password"
          onChangeText={(password) => this.setState({password})}
          onSubmitEditing={this.onSubmit}
          value={this.state.password}
        />

        <TouchableOpacity style={styles.btn} activeOpacity={loggingIn ? 0.5 : 1} onPress={loggingIn ? () => {} : this.onSubmit}>
          <Text style={styles.btnLabel}>{loggingIn ? '⎋ -------' : 'LOGGA IN'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.openPassword}>
          <Text style={styles.forgotten}> Glömt dina uppgifter? </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    marginTop: 10,
    color: '#444',
    fontSize: 20,
  },
  inputField: {
    padding: 5,
    margin: 10,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 5,
    fontSize: 20,
    textAlign: 'center'
  },
  btn: {
    marginTop: 10,
    padding: 20,
    paddingLeft: 80,
    paddingRight: 80,
    borderRadius: 10,
    backgroundColor: '#0091e5'
  },
  btnLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgotten: {
    marginTop: 40,
    color: '#444',
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  logo: {
    marginBottom: 40
  }
});


const signinUser = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`

export default graphql(signinUser, { name: 'signinUser' })(Login)
