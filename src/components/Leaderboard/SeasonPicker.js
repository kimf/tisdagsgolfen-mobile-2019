import React, { Component } from 'react'
import { Animated } from 'react-native'
import { arrayOf, string, func } from 'prop-types'

import TGText from 'shared/TGText'
import { seasonShape } from 'propTypes'
import { colors } from 'styles'

class SeasonPicker extends Component {
  static propTypes = {
    seasons: arrayOf(seasonShape).isRequired,
    currentSeasonId: string.isRequired,
    onChangeSeason: func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      }
    ).start()
  }

  render() {
    const { seasons, currentSeasonId, onChangeSeason } = this.props
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
          shadowOffset: { width: 0, height: 200 },
          shadowRadius: 200,
          shadowOpacity: 1,
          elevation: 5,
          transform: [{
            translateY: this.state.fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-200, 0]  // 0 : 150, 0.5 : 75, 1 : 0
            })
          }]
        }}
      >
        <TGText style={{ fontSize: 24, fontWeight: '900', textAlign: 'center', marginBottom: 20 }}>
          Byt säsong
        </TGText>
        {seasons.map((season) => {
          const isCurrentSeason = currentSeasonId && season.id === currentSeasonId
          const color = isCurrentSeason ? colors.green : colors.muted
          const fontWeight = isCurrentSeason ? '900' : '400'
          return (
            <TGText
              onPress={() => onChangeSeason(season.id)}
              key={`SeasonPicker_${season.id}`}
              viewStyle={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingVertical: 5 }}
              style={{
                paddingTop: 40, textAlign: 'center', color, fontSize: 20, fontWeight
              }}
            >
              {season.name}
            </TGText>
          )
        })}
      </Animated.View>
    )
  }
}

export default SeasonPicker
