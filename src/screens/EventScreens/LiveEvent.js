import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'

import styles from 'styles'

class LiveEvent extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Avbryt',
        id: 'cancel'
      }
    ]
  }

  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent = (event) => {
    const { navigator } = this.props
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        navigator.dismissModal()
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text>Följa live...</Text>
        </View>
      </View>
    )
  }
}

LiveEvent.propTypes = {
  navigator: PropTypes.shape().isRequired
}

export default LiveEvent
