import React, { Component } from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { func, string } from 'prop-types'

import Logo from 'Login/Logo'
import Form from 'Login/LoginForm'
import Wallpaper from 'Login/Wallpaper'

import { login } from 'actions/app'

import { withSigninUserMutation } from 'mutations/signinUserMutation'

class Login extends Component {
  static propTypes = {
    email: string,
    signinUser: func.isRequired,
    onLogin: func.isRequired
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
    this.props.signinUser({ variables: { email, password } })
      .then((response) => {
        this.props.onLogin(email, response.data.signinUser.token)
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
        <Form
          {...this.state}
          changeValue={this.changeValue}
          onSubmit={this.onSubmit}
        />
      </Wallpaper>
    )
  }
}

const mapStateToProps = state => ({ email: state.app.email })

const mapDispatchToProps = dispatch => ({
  onLogin: (email, token) => dispatch(login(email, token))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSigninUserMutation
)(Login)
