import React, {Component, PropTypes} from "react";
import {Linking, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from "react-native";
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { setCache } from '../utils'
import Loading from '../components/Loading'

class Login extends Component {
  state = {
    email: '',
    password: '',
    loggingIn: false,
    error: null
  }

  onSubmit = () => {
    this.setState({ loggingIn: true });
    const { email, password } = this.state;
    this.props.signinUser({ variables: { email, password } })
      .then(response => {
        setCache('graphcoolToken', response.data.signinUser.token)
        this.setState({ loggingIn: false, error: null });
        this.props.afterLogin()
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        this.setState({ error: e, loggingIn: false });
        console.log(e)
      })
  }

  openPassword = () => {
    Linking.openURL('https://www.tisdagsgolfen.se/password_resets/new');
  }


  render() {
    const { data } = this.props;
    const { loggingIn, error } = this.state;

    if (data.loading)
      return <Loading />

    if (loggingIn)
      return <Loading text="Loggar in..." />

    let showError;
    if(error) {
      showError = <Text style={{color: '#c00', fontSize: 20}}>Något gick fel, se över infon</Text>;
    }

    return(
      <View style={{
        flex: 1,
        flexDirection: 'column',
        paddingTop: 60,
        backgroundColor: '#ccc',
        alignItems: 'center'
      }}>
        <Image source={require('../images/logo.png')} style={styles.logo} />

        {showError}

        <Text style={styles.label}>E-post</Text>
        <TextInput
          style={styles.inputField}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          ref= "email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />

        <Text style={styles.label}>Lösenord</Text>
        <TextInput
          style={styles.inputField}
          autoCapitalize="none"
          secureTextEntry={true}
          ref= "password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />

        <TouchableOpacity style={styles.btn} onPress={this.onSubmit}>
          <Text style={styles.btnLabel}>LOGGA IN</Text>
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

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default compose(
  graphql(signinUser, { name: 'signinUser' }),
  graphql(userQuery)
)(Login)
