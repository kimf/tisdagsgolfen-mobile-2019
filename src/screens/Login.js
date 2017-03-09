import React, { Component, PropTypes } from 'react'
import { Linking } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

import Logo from '../components/Login/Logo'
import LoginError from '../components/Login/LoginError'
import Form from '../components/Login/LoginForm'
import Wallpaper from '../components/Login/Wallpaper'
import ButtonSubmit from '../components/Login/ButtonSubmit'

import { login } from '../reducers/app'

class Login extends Component {
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
        {error ? <LoginError /> : null}
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

Login.propTypes = {
  email: PropTypes.string,
  signinUser: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
}

Login.defaultProps = {
  email: ''
}

const signinUser = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`

const mapStateToProps = state => ({
  email: state.app.email
})

const mapDispatchToProps = dispatch => (
  {
    onLogin: (email, token) => dispatch(login(email, token))
  }
)

const withData = graphql(signinUser, { name: 'signinUser' })(Login)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withData)
