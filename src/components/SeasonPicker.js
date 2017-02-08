import React from 'react'
import { View, Button } from 'react-native'

const SeasonPicker = ({seasons, currentSeasonId, onChangeSeason}) => {
  return (
    <View style={{
      padding: 5,
      backgroundColor: '#eee',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }}>
      { seasons.map(season => {
        const color = currentSeasonId && season.id === currentSeasonId ? '#000' : '#ccc'
        return <Button
          style={{flex: 1}}
          key={`SeasonPicker_${season.id}`}
          color={color}
          title={season.name}
          onPress={() => onChangeSeason(season.id)}
        />
      })}
    </View>
  )
}

export default SeasonPicker
