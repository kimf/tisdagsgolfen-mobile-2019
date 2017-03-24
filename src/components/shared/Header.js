import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'
import styles from 'styles'

const { string, oneOfType, arrayOf, node } = PropTypes

class Header extends Component {
  static propTypes = {
    title: string.isRequired,
    children: oneOfType([
      arrayOf(node),
      node
    ]),
    color: string,
    backgroundColor: string
  }

  static defaultProps = {
    children: null,
    color: '#000',
    backgroundColor: '#eee'
  }

  render() {
    const { title, children, backgroundColor, color } = this.props

    return (
      <View
        style={[styles.navbar, {  backgroundColor }]}
      >
        <View style={[styles.navbarInner, { backgroundColor }]}>
          <TGText adjustsFontSizeToFitHeight style={[styles.navbarTitle, { color }]}>
            {title}
          </TGText>
          {children}
        </View>
      </View >
    )
  }
}

export default Header
