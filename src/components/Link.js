import React, { Component, PropTypes } from 'react'
import { TouchableHighlight, TouchableNativeFeedback, Platform } from 'react-native'

class Link extends Component {
  static contextTypes = {
    history: React.PropTypes.object
  }

  static propTypes = {
    component: PropTypes.func,
    replace: PropTypes.bool,
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired
  }

  static defaultProps = {
    component: Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback,
    replace: false
  }

  handlePress = () => {
    const { history } = this.context
    const { to, replace } = this.props

    if (replace) {
      history.replace(to)
    } else {
      history.push(to)
    }
  }

  render() {
    const { component: LinkComponent, ...rest } = this.props
    return (
      <LinkComponent
        {...rest}
        onPress={this.handlePress}
      />
    )
  }
}

export default Link
