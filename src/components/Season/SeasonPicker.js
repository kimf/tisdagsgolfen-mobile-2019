import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

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
    { seasons.map((season) => {
      const color = currentSeasonId && season.id === currentSeasonId ? '#3FB4CF' : '#ccc'
      return (
        <TouchableOpacity
          onPress={() => onChangeSeason(season.id)}
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingVertical: 5 }}
          key={`SeasonPicker_${season.id}`}
        >
          <Text style={{ color }}>
            {season.name}
          </Text>
        </TouchableOpacity>
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
