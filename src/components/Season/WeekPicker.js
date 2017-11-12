import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { arrayOf, shape, number, bool, string, func } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'
import trophyImg from 'images/trophy-filled.png'

const WeekPickerItem = ({ week, isCurrent, onSelectWeek }) => (
  <TGText
    style={{
      color: isCurrent ? colors.white : colors.dark,
      textAlign: 'center',
      fontSize: 14,
      fontWeight: isCurrent ? 'bold' : 'normal'
    }}
    viewStyle={{
      borderRadius: 35,
      padding: 5,
      height: 35,
      width: 35,
      backgroundColor: isCurrent ? colors.darkGreen : colors.gray,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center'
    }}
    onPress={onSelectWeek}
  >
    {week === 'final' ? (
      <Image source={trophyImg} style={{ height: 15, width: 15, tintColor: 'white' }} />
    ) : (
      `${week}`
    )}
  </TGText>
)

WeekPickerItem.propTypes = {
  week: string.isRequired,
  isCurrent: bool.isRequired,
  onSelectWeek: func.isRequired
}

const WeekPicker = ({ weeks, currentId, onChangeWeek }) => (
  <View style={{ height: 60 }}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: 'rgba(218,218,218,1)', padding: 10, paddingLeft: 20 }}
      containerStyle={{ justifyContent: 'center' }}
    >
      {weeks.map(week => (
        <WeekPickerItem
          key={`weekPickerItem_${week.id}`}
          week={week.id === 'final' ? week.id : week.index}
          isCurrent={currentId === week.id}
          onSelectWeek={() => onChangeWeek(week.id)}
        />
      ))}
    </ScrollView>
  </View>
)
// [...Array(reversedEventIds.length)]

WeekPicker.propTypes = {
  weeks: arrayOf(shape({
    id: string.isRequired,
    index: string.isRequired
  }).isRequired).isRequired,
  currentId: string.isRequired,
  onChangeWeek: func.isRequired
}

export default WeekPicker
