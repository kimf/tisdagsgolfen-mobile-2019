import React, { Component, PropTypes } from 'react'
import { Linking } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

import Logo from 'Login/Logo'
import LoginError from 'Login/LoginError'
import Form from 'Login/LoginForm'
import Wallpaper from 'Login/Wallpaper'

import { login } from 'actions/app'

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
    const { error } = this.state

    return (
      <Wallpaper>
        <Logo />
        {error ? <LoginError /> : null}
        <Form
          {...this.state}
          changeValue={this.changeValue}
          onSubmit={this.onSubmit}
        />
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
