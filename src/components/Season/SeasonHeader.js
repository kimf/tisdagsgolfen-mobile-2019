import React from 'react'
import { View, Image } from 'react-native'
import { func, shape } from 'prop-types'

import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'

import { seasonShape } from 'propTypes'
import { colors, NAVBAR_HEIGHT, STATUS_BAR_HEIGHT } from 'styles'

const SeasonHeader = ({ season, togglePicker, goPlay, activeScoringSession }) => (
  <View
    style={{
      backgroundColor: colors.lightGray,
      height: NAVBAR_HEIGHT + STATUS_BAR_HEIGHT,
      padding: 5,
      flexDirection: 'row',
      alignContent: 'center'
    }}>
    <TouchableView
      style={{
        padding: 10,
        paddingTop: STATUS_BAR_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
      }}
      onPress={togglePicker}>
      <TGText
        style={{
          color: colors.dark,
          fontWeight: 'bold',
          fontSize: 20
        }}>
        {season.name}
      </TGText>
      <Image
        style={{
          tintColor: colors.dark,
          resizeMode: 'contain',
          height: 18,
          width: 18,
          marginLeft: 5
        }}
        source={require('../../images/slide-up.png')}
      />
    </TouchableView>
    <TouchableView
      style={{
        padding: 10,
        paddingTop: STATUS_BAR_HEIGHT,
        justifyContent: 'center'
      }}
      onPress={goPlay}>
      <TGText
        style={{
          color: activeScoringSession ? colors.white : colors.darkGreen,
          fontWeight: 'bold',
          fontSize: 14,
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: activeScoringSession ? colors.darkGreen : colors.white,
          borderRadius: 10
        }}
        onPress={goPlay}>
        {activeScoringSession ? 'FORTSÄTT RUNDA' : 'SPELA GOLF'}
      </TGText>
    </TouchableView>
  </View>
)

SeasonHeader.propTypes = {
  season: seasonShape.isRequired,
  togglePicker: func.isRequired,
  goPlay: func.isRequired,
  activeScoringSession: shape()
}

SeasonHeader.defaultProps = {
  activeScoringSession: null
}

export default SeasonHeader
