import React from 'react'
import { View, Button } from 'react-native'

const SeasonPicker = ({ seasons, currentSeasonId, onChangeSeason }) => (
  <View
    style={{
      padding: 5,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#333',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }}
  >
    { seasons.map((season) => {
      const color = currentSeasonId && season.id === currentSeasonId ? '#3FB4CF' : '#ccc'
      return (
        <Button
          style={{ flex: 1 }}
          key={`SeasonPicker_${season.id}`}
          color={color}
          title={season.name}
          onPress={() => onChangeSeason(season.id)}
        />
      )
    })}
  </View>
)


const { arrayOf, shape, string, func } = React.PropTypes

SeasonPicker.propTypes = {
  seasons: arrayOf(shape().isRequired).isRequired,
  currentSeasonId: string.isRequired,
  onChangeSeason: func.isRequired
}

export default SeasonPicker
