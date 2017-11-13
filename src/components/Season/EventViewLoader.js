import React from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'
import styles, { colors } from 'styles'

const EventViewLoaderRow = () => <View style={[styles.listrow, { height: 60 }]} />

const items = [...new Array(10)].map((i, index) => index)

const EventViewLoader = () => (
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1, backgroundColor: colors.lighterGray, flexDirection: 'column' }}>
      {items.map(item => <EventViewLoaderRow key={item} />)}
    </View>
    <View
      style={{
        padding: 10,
        height: 60,
        backgroundColor: colors.lightGray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    />
  </View>
)

export default EventViewLoader