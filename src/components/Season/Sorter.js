import React from 'react'
import { View } from 'react-native'
import { shape, string, func, bool } from 'prop-types'

import TGText from 'shared/TGText'

const tabs = [
  { value: 'totalPoints', icon: '🤷' },
  { value: 'beers', icon: '🍻' },
  { value: 'kr', icon: '💸' }
]

const SorterItem = ({ tab, isCurrent, onChange }) => (
  <TGText
    onPress={() => onChange(tab.value)}
    style={{
      padding: 10,
      fontSize: 20,
      color: isCurrent ? 'black' : 'white'
    }}
  >
    {tab.icon}
  </TGText>
)

SorterItem.propTypes = {
  tab: shape({
    value: string.isRequired,
    icon: string.isRequired
  }).isRequired,
  isCurrent: bool.isRequired,
  onChange: func.isRequired
}

const Sorter = ({ current, onChange }) => (
  <View style={{ flexDirection: 'row' }}>
    {tabs.map(tab => (
      <SorterItem key={tab.value} tab={tab} isCurrent={tab === current} onChange={onChange} />
    ))}
  </View>
)

Sorter.propTypes = {
  current: string.isRequired,
  onChange: func.isRequired
}

export default Sorter
