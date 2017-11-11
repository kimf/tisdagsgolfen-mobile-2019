import React from 'react'
import { View, Image } from 'react-native'
import { number, string, func } from 'prop-types'

import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'
import { colors } from 'styles'

const imageStyle = {
  tintColor: colors.white,
  resizeMode: 'contain',
  height: 16,
  width: 16,
  marginRight: 8
}

const emptyButton = <View style={{ width: 40 }} />
const leftImage = <Image style={imageStyle} source={require('../../images/left.png')} />
const rightImage = <Image style={imageStyle} source={require('../../images/right.png')} />

const WeekHeader = ({
  eventCount, weekIndex, weekName, onChangeWeek
}) => (
  <View
    style={{
      backgroundColor: colors.blue,
      width: '100%',
      height: 40,
      flexDirection: 'row',
      alignItems: 'center'
    }}
  >
    {weekIndex !== 0 ? (
      <TouchableView style={{ padding: 8 }} onPress={() => onChangeWeek(weekIndex - 1)}>
        {leftImage}
      </TouchableView>
    ) : (
      emptyButton
    )}

    <View
      style={{
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <TGText style={{ color: colors.white, fontWeight: 'bold' }}>{weekName}</TGText>
    </View>

    {weekIndex < eventCount - 1 ? (
      <TouchableView style={{ padding: 8 }} onPress={() => onChangeWeek(weekIndex + 1)}>
        {rightImage}
      </TouchableView>
    ) : (
      emptyButton
    )}
  </View>
)

WeekHeader.propTypes = {
  onChangeWeek: func.isRequired,
  eventCount: number.isRequired,
  weekIndex: number.isRequired,
  weekName: string.isRequired
}

export default WeekHeader
