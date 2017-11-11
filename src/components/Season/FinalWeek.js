import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { shape, func } from 'prop-types'

import TGText from 'shared/TGText'
import BottomButton from 'shared/BottomButton'
import { colors } from 'styles'
import { seasonShape } from 'propTypes'

class FinalWeek extends Component {
  static navigationOptions = ({ screenProps }) => ({
    title: `Final ${screenProps.season.name}`
  })

  static propTypes = {
    screenProps: shape({
      season: seasonShape.isRequired
    }).isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  }

  gotoEvent = () => {
    this.props.navigation.navigate('Week', { weekIndex: 0 })
  }

  render() {
    const { screenProps: { season } } = this.props
    return [
      <View
        key="finalWeekHeader"
        style={{
          flexDirection: 'row',
          padding: 20,
          backgroundColor: colors.darkGreen,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          source={require('../../images/trophy-filled.png')}
          style={{ tintColor: colors.yellow, height: 25, width: 25 }}
        />
        <TGText style={{ marginLeft: 10, color: colors.white, fontWeight: 'bold' }}>
          Grattis Tobbelito!
        </TGText>
      </View>,
      <Image
        key="winnerPhoto"
        style={{ width: '100%', height: 200 }}
        source={{ uri: season.photo, cache: 'force-cache' }}
        resizeMode="cover"
      />,
      <TGText key="finaleInfo" style={{ padding: 20, fontSize: 20 }}>
        Denna säsong är avslutad, här ska det vara lite info om finalen, kanske rundornas
        resultat...
      </TGText>,
      <BottomButton
        key="goToEventsBottomButton"
        onPress={this.gotoEvent}
        title="Se säsongens resultat"
      />
    ]
  }
}

export default FinalWeek
