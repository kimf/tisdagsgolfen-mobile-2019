import React from 'react'
import { Image } from 'react-native'
import { bool, func } from 'prop-types'

import TouchableView from 'shared/TouchableView'
import TGText from 'shared/TGText'
import { colors } from 'styles'
import { seasonShape } from 'propTypes'

const SeasonCard = ({ onPress, season }) => (
  <TouchableView
    onPress={onPress}
    style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 5
    }}
  >
    {season.photo && (
      <Image style={{ flex: 1 }} source={{ uri: season.photo }} resizeMode="cover" />
    )}
    <TGText
      onPress={onPress}
      style={{
        paddingTop: 40,
        textAlign: 'center',
        color: colors.dark,
        fontSize: 22
      }}
    >
      {season.name}
    </TGText>
  </TouchableView>
)

SeasonCard.propTypes = {
  onPress: func.isRequired,
  season: seasonShape.isRequired
}

export default SeasonCard
