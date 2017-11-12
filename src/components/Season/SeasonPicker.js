import React, { Component } from 'react'
import { Animated } from 'react-native'
import { arrayOf, func } from 'prop-types'

import { seasonShape } from 'propTypes'
import { colors } from 'styles'
import SeasonCard from './SeasonCard'

class SeasonPicker extends Component {
  static propTypes = {
    seasons: arrayOf(seasonShape).isRequired,
    onChangeSeason: func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start()
  }

  render() {
    const { seasons, onChangeSeason } = this.props
    return (
      <Animated.View
        style={{
          zIndex: 2000,
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          padding: 10,
          paddingTop: 80,
          paddingBottom: 80,
          backgroundColor: colors.lightGray,
          flexDirection: 'column',
          shadowColor: colors.dark,
          shadowOffset: { width: 200, height: 100 },
          shadowRadius: 200,
          shadowOpacity: 1,
          elevation: 5,
          transform: [
            {
              translateX: this.state.fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-200, 0] // 0 : 150, 0.5 : 75, 1 : 0
              })
            }
          ]
        }}
      >
        {seasons.map(season => (
          <SeasonCard
            key={`SeasonCard_${season.id}`}
            onPress={() => onChangeSeason(season.id)}
            season={season}
          />
        ))}
      </Animated.View>
    )
  }
}

export default SeasonPicker
