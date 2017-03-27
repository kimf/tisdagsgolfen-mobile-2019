import React, { Component, PropTypes } from 'react'
import { View, Image } from 'react-native'

import TouchableView from 'shared/TouchableView'
import TGText from 'shared/TGText'
import styles from 'styles'

const { string, func, oneOfType, arrayOf, node } = PropTypes

class Header extends Component {
  static propTypes = {
    title: string.isRequired,
    children: oneOfType([
      arrayOf(node),
      node
    ]),
    color: string,
    backgroundColor: string,
    goBack: func
  }

  static defaultProps = {
    children: null,
    color: '#000',
    backgroundColor: '#eee',
    goBack: null
  }

  renderGoBack = () => (
    <TouchableView
      style={{
        position: 'absolute',
        top: 20,
        right: 10,
        padding: 20
      }}
      onPress={this.props.goBack}
    >
      <Image
        style={{ tintColor: '#ccc' }}
        source={require('../../images/close.png')}
      />
    </TouchableView >
  )

  render() {
    const { title, children, backgroundColor, color, goBack } = this.props

    return (
      <View
        style={[styles.navbar, { backgroundColor }]}
      >
        <View style={[styles.navbarInner, { backgroundColor }]}>
          <TGText adjustsFontSizeToFitHeight style={[styles.navbarTitle, { color }]}>
            {title}
          </TGText>
          {goBack ? this.renderGoBack() : null}
          {children}
        </View>
      </View >
    )
  }
}

export default Header
