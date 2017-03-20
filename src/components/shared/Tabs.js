import React from 'react'
import { View } from 'react-native'

import Tab from 'shared/Tab'

const Tabs = ({ currentRoute, onChange, tabs, style }) => (
  <View
    style={{
      ...style,
      backgroundColor: '#eee',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
      paddingHorizontal: 5,
      paddingVertical: 5
    }}
  >
    {tabs.map(tab =>
      <Tab
        key={tab.value}
        tab={tab}
        isCurrent={currentRoute === tab.value}
        onChange={onChange}
        fontSize={16}
        padding={10}
      />
    )}
  </View>
)

const { arrayOf, string, func, shape } = React.PropTypes

Tabs.propTypes = {
  currentRoute: string.isRequired,
  onChange: func.isRequired,
  tabs: arrayOf(shape()),
  style: View.propTypes.style
}

Tabs.defaultProps = {
  bottom: false,
  style: {},
  tabs: [
    { value: 'totalPoints', icon: '🤷', title: 'Poäng' },
    { value: 'beers', icon: '🍻', title: 'Öl' },
    { value: 'kr', icon: '💸', title: 'Skuld' }
  ]
}

export default Tabs
