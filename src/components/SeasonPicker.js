import React from 'react'
import { View, Button } from 'react-native'

const SeasonPicker = ({seasons, currentSeason, onChangeSeason}) => {
  return (
    <View style={{
      padding: 5,
      backgroundColor: '#eee',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }}>
      { seasons.map(season => {
        const color = currentSeason && season.id === currentSeason.id ? '#000' : '#ccc'
        return <Button
          style={{flex: 1}}
          key={`SeasonPicker_${season.id}`}
          color={color}
          title={season.name}
          onPress={() => onChangeSeason(season)}
        />
      })}
    </View>
  )
}

export default SeasonPicker
