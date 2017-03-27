import React from 'react'
import { View } from 'react-native'

import Tab from 'shared/Tab'
import styles from 'styles'

const Tabs = ({ currentRoute, onChange, tabs }) => (
  <View style={styles.tabs}>
    {tabs.map(t => (
      <Tab
        key={`tab_${t.value}`}
        tab={t}
        isCurrent={currentRoute === t.value}
        onChange={onChange}
      />
    ))}
  </View>
)

const { arrayOf, string, func, shape } = React.PropTypes

Tabs.propTypes = {
  currentRoute: string.isRequired,
  onChange: func.isRequired,
  tabs: arrayOf(shape())
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
