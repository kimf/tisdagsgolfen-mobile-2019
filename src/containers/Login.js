import React, { Component, PropTypes } from 'react'
import { Linking } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Logo from '../components/Logo'
import LoginError from '../components/LoginError'
import Form from '../components/LoginForm'
import Wallpaper from '../components/Wallpaper'
import ButtonSubmit from '../components/ButtonSubmit'

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: props.email || '',
      password: '',
      loggingIn: false,
      error: null
    }
  }

  onSubmit = () => {
    this.setState({ loggingIn: true })
    const { email, password } = this.state
    this.props.signinUser({ variables: { email, password } })
      .then((response) => {
        this.props.onLogin(email, response.data.signinUser.token)
        this.setState({ loggingIn: false, error: false })
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.warn(e)
        this.setState({ error: e, loggingIn: false })
      })
  }

  changeValue = (valueObject) => {
    this.setState(valueObject)
  }

  openPassword = () => {
    Linking.openURL('https://www.tisdagsgolfen.se/password_resets/new')
  }

  render() {
    const { loggingIn, error, email, password } = this.state

    return (
      <Wallpaper>
        <Logo />
        {error && <LoginError />}
        <Form
          email={email}
          password={password}
          changeValue={this.changeValue}
          onSubmit={this.onSubmit}
        />
        <ButtonSubmit onPress={loggingIn ? () => {} : this.onSubmit} />
      </Wallpaper>
    )
  }
}

LoginScreen.propTypes = {
  email: PropTypes.string,
  signinUser: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
}

LoginScreen.defaultProps = {
  email: ''
}

const signinUser = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`

export default graphql(signinUser, { name: 'signinUser' })(LoginScreen)
