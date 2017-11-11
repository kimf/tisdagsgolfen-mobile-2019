import React from 'react'
import { ScrollView, View } from 'react-native'
import { arrayOf, bool, number, func } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const WeekPickerItem = ({ week, isCurrent, onSelectWeek }) => (
  <TGText
    style={{
      color: isCurrent ? colors.white : colors.dark,
      textAlign: 'center',
      fontSize: 14,
      fontWeight: isCurrent ? 'bold' : 'normal'
    }}
    viewStyle={{
      borderRadius: 30,
      padding: 5,
      height: 30,
      width: 30,
      backgroundColor: isCurrent ? colors.blue : colors.gray,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center'
    }}
    onPress={onSelectWeek}
  >
    {`${week + 1}`}
  </TGText>
)

WeekPickerItem.propTypes = {
  week: number.isRequired,
  isCurrent: bool.isRequired,
  onSelectWeek: func.isRequired
}

const WeekPicker = ({ weeks, currentIndex, onChangeWeek }) => (
  <View style={{ height: 50 }}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: colors.dark, padding: 10 }}
      containerStyle={{ justifyContent: 'center' }}
    >
      {weeks.map((week, index) => (
        <WeekPickerItem
          key={`weekPickerItem_${week}`}
          week={week}
          isCurrent={currentIndex === week}
          onSelectWeek={() => onChangeWeek(index)}
        />
      ))}
    </ScrollView>
  </View>
)
// [...Array(reversedEventIds.length)]

WeekPicker.propTypes = {
  weeks: arrayOf(number).isRequired,
  currentIndex: number.isRequired,
  onChangeWeek: func.isRequired
}

export default WeekPicker
