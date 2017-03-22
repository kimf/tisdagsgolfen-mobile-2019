import React from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'

import { STATUS_BAR_HEIGHT } from 'styles'

const SeasonPicker = ({ seasons, currentSeasonId, onChangeSeason }) => (
  <View
    style={{
      zIndex: 2000,
      padding: 5,
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: STATUS_BAR_HEIGHT,
      backgroundColor: '#222',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}
  >
    {seasons.map((season) => {
      const color = currentSeasonId && season.id === currentSeasonId ? '#3FB4CF' : '#ccc'
      return (
        <TGText
          onPress={() => onChangeSeason(season.id)}
          key={`SeasonPicker_${season.id}`}
          viewStyle={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingVertical: 5 }}
          style={{ textAlign: 'center', color, fontSize: 16, fontWeight: 'bold' }}
        >
          {season.name}
        </TGText>
      )
    })}
  </View>
)


const { arrayOf, shape, string, func } = React.PropTypes

SeasonPicker.propTypes = {
  seasons: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired
    }).isRequired
  ).isRequired,
  currentSeasonId: string.isRequired,
  onChangeSeason: func.isRequired
}

export default SeasonPicker
