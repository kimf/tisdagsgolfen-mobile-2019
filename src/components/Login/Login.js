import React, { Component } from 'react'
import { View } from 'react-native'
import { func, string, shape } from 'prop-types'

import Form from './LoginForm'
import TGText from '../shared/TGText'
import { colors } from '../../styles'

import { withSigninUserMutation } from '../../graph/mutations/signinUserMutation'

const icon = '☠️'

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
      .then(response => {
        this.props.onLogin(response.data.authenticateUser)
        this.setState({ loggingIn: false, error: false })
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.warn(e)
        this.setState({ error: true, loggingIn: false })
      })
  }

  changeValue = valueObject => {
    this.setState(valueObject)
  }

  render() {
    return (
      <View
        style={{
          height: '100%',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          backgroundColor: colors.dark
        }}>
        <TGText
          style={{
            padding: 20,
            fontSize: 60,
            color: colors.red,
            textAlign: 'center'
          }}>
          {icon}
        </TGText>
        <Form {...this.state} changeValue={this.changeValue} onSubmit={this.onSubmit} />
      </View>
    )
  }
}

export default withSigninUserMutation(Login)
