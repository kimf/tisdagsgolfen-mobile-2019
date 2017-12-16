import React from 'react'
import { Image, FlatList, View } from 'react-native'
import { arrayOf, shape, bool, string, func } from 'prop-types'

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
    onPress={onSelectWeek}>
    {week === 'final' ? (
      <Image
        source={trophyImg}
        style={{
          height: 16,
          width: 16,
          tintColor: 'yellow',
          marginTop: 3
        }}
      />
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
    <FlatList
      removeClippedSubviews={false}
      horizontal
      data={weeks}
      style={{
        backgroundColor: 'rgba(218,218,218,1)',
        padding: 10
      }}
      containerStyle={{ justifyContent: 'center' }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <WeekPickerItem
          week={item.id === 'final' ? item.id : item.index}
          isCurrent={currentId === item.id}
          onSelectWeek={() => onChangeWeek(item.id)}
        />
      )}
      keyExtractor={item => `weekPickerItem_${item.id}`}
    />
  </View>
)
// [...Array(reversedEventIds.length)]

WeekPicker.propTypes = {
  weeks: arrayOf(
    shape({
      id: string.isRequired,
      index: string.isRequired
    }).isRequired
  ).isRequired,
  currentId: string.isRequired,
  onChangeWeek: func.isRequired
}

export default WeekPicker
