import React from 'react'
import { View, Image } from 'react-native'
import { func } from 'prop-types'

import TGText from 'shared/TGText'
import BottomButton from 'shared/BottomButton'
import { colors } from 'styles'
import { seasonShape } from 'propTypes'

const FinalWeek = ({ season, onGoToResult }) => [
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
    Denna säsong är avslutad, här ska det vara lite info om finalen, kanske rundornas resultat...
  </TGText>,
  <BottomButton key="goToEventsBottomButton" onPress={onGoToResult} title="Se säsongens resultat" />
]

FinalWeek.propTypes = {
  season: seasonShape.isRequired,
  onGoToResult: func.isRequired
}

export default FinalWeek
