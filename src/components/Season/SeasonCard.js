import React from 'react'
import { ImageBackground } from 'react-native'
import { func } from 'prop-types'

import TouchableView from 'shared/TouchableView'
import TGText from 'shared/TGText'
import { colors } from 'styles'
import { seasonShape } from 'propTypes'

const SeasonCard = ({ onPress, season }) => (
  <TouchableView
    onPress={onPress}
    style={{
      flex: 1,
      marginBottom: 10
    }}
  >
    <ImageBackground
      onPress={onPress}
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        height: '100%'
      }}
      source={{ uri: season.photo }}
      resizeMode="cover"
    >
      <TGText
        style={{
          padding: 10,
          textShadowColor: colors.dark,
          textShadowOffset: { width: 2, height: 2 },
          backgroundColor: 'transparent',
          color: colors.white,
          fontSize: 24
        }}
      >
        {season.name}
      </TGText>
    </ImageBackground>
  </TouchableView>
)

SeasonCard.propTypes = {
  onPress: func.isRequired,
  season: seasonShape.isRequired
}

export default SeasonCard
