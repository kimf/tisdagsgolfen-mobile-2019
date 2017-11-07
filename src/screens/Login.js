import React, { Component } from 'react'
import { func, string } from 'prop-types'

import Logo from 'Login/Logo'
import Form from 'Login/LoginForm'
import Wallpaper from 'Login/Wallpaper'

import { setCache } from 'utils'
import { withSigninUserMutation } from 'mutations/signinUserMutation'

class Login extends Component {
  static propTypes = {
    email: string,
    signinUser: func.isRequired
  }

  static defaultProps = {
    email: ''
  }

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

    this.props
      .signinUser({ variables: { email, password } })
      .then((response) => {
        setCache('currentUser', {
          user: response.data.authenticateUser.user,
          token: response.data.authenticateUser.token
        }).then(() => {
          this.setState({ loggingIn: false, error: false })
        })
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
