import React from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'

const SeasonPicker = ({ seasons, currentSeasonId, onChangeSeason }) => (
  <View
    style={{
      padding: 5,
      paddingTop: 10,
      paddingBottom: 10,
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
          style={{ textAlign: 'center', color, fontSize: 20, fontWeight: 'bold' }}
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
