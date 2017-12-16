import React from 'react'
import { Animated } from 'react-native'
import { arrayOf, func, shape } from 'prop-types'

import { seasonShape } from 'propTypes'
import { colors } from 'styles'
import SeasonCard from './SeasonCard'

const SeasonPicker = ({ seasons, onChangeSeason, position }) => (
  <Animated.View
    style={{
      zIndex: 2000,
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      padding: 40,
      backgroundColor: colors.lightGray,
      flexDirection: 'column',
      transform: [
        {
          translateY: position
        }
      ]
    }}>
    {seasons.map(season => (
      <SeasonCard
        key={`SeasonCard_${season.id}`}
        onPress={() => onChangeSeason(season.id)}
        photo={season.photo}
        name={season.name}
      />
    ))}
  </Animated.View>
)

SeasonPicker.propTypes = {
  seasons: arrayOf(seasonShape).isRequired,
  position: shape().isRequired,
  onChangeSeason: func.isRequired
}

export default SeasonPicker
