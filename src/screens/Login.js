import React, { Component } from 'react'
import { func, string, shape } from 'prop-types'

import Logo from 'Login/Logo'
import Form from 'Login/LoginForm'
import Wallpaper from 'Login/Wallpaper'

import { withSigninUserMutation } from 'mutations/signinUserMutation'

class Login extends Component {
  static propTypes = {
    signinUser: func.isRequired,
    onLogin: func.isRequired,
    currentUser: shape({
      email: string
    })
  }

  static defaultProps = {
    currentUser: null
  }

  constructor(props) {
    super(props)
    const { currentUser } = this.props
    this.state = {
      email: (currentUser && currentUser.email) || '',
      password: '',
      loggingIn: false,
      error: null
    }
  }

  onSubmit = () => {
    this.setState({ loggingIn: true })
    const { email, password } = this.state

    this.props
      .signinUser({ variables: { email, password } })
      .then((response) => {
        this.props.onLogin(response.data.authenticateUser)
        this.setState({ loggingIn: false, error: false })
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.warn(e)
        this.setState({ error: true, loggingIn: false })
      })
  }

  changeValue = (valueObject) => {
    this.setState(valueObject)
  }

  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form {...this.state} changeValue={this.changeValue} onSubmit={this.onSubmit} />
      </Wallpaper>
    )
  }
}

export default withSigninUserMutation(Login)
