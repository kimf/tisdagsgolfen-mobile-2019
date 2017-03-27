import React, { Component } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'
import BottomButton from 'shared/BottomButton'
import styles from 'styles'

class ScoringMenu extends Component {
  static navigationOptions = {
    title: 'Meny',
    tabBar: () => ({
      visible: false
    }),
    cardStack: {
      gesturesEnabled: true
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TGText style={{ fontSize: 20, fontWeight: '900', textAlign: 'center', marginBottom: 20 }}>
          Här kommer text sen
        </TGText>

        <BottomButton backgroundColor="red" title="AVSLUTA RUNDA" onPress={() => { }} />
      </View>
    )
  }
}

export default ScoringMenu
