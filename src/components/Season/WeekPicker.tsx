import React from 'react'
import { FlatList, Image, View } from 'react-native'

import trophyImg from '../../images/trophy-filled.png'
import { colors } from '../../styles'
import TGText from '../shared/TGText'

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

const WeekPicker = ({ weeks, currentId, onChangeWeek }) => (
  <View style={{ height: 60 }}>
    <FlatList
      removeClippedSubviews={false}
      horizontal={true}
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

export default WeekPicker
