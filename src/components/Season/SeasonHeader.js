import React from 'react'
import { View, Image } from 'react-native'
import { func } from 'prop-types'

import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'

import { seasonShape } from 'propTypes'
import { colors, NAVBAR_HEIGHT, STATUS_BAR_HEIGHT } from 'styles'

const SeasonHeader = ({ season, togglePicker }) => (
  <View
    style={{
      backgroundColor: colors.lightGray,
      height: NAVBAR_HEIGHT + STATUS_BAR_HEIGHT,
      padding: 5
    }}
  >
    <TouchableView
      style={{
        padding: 10,
        paddingTop: STATUS_BAR_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center'
      }}
      onPress={togglePicker}
    >
      <TGText
        style={{
          color: colors.dark,
          fontWeight: 'bold',
          fontSize: 20
        }}
      >
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
  </View>
)

SeasonHeader.propTypes = {
  season: seasonShape.isRequired,
  togglePicker: func.isRequired
}

export default SeasonHeader
