import React from 'react'
import { View } from 'react-native'
import { string, func } from 'prop-types'

import Tab from 'shared/Tab'
import styles from 'styles'

const Tabs = ({ currentRoute, onChange, scoringType }) => {
  const strokes = scoringType === 'strokes'
  const tabs = [
    { value: 'totalPoints', icon: '🤷', title: strokes ? 'Slag' : 'Poäng' },
    { value: 'beers', icon: '🍻', title: 'Öl' },
    { value: 'kr', icon: '💸', title: 'Skuld' }
  ]

  return (
    <View style={styles.tabs} >
      {
        tabs.map(t => (
          <Tab
            key={`tab_${t.value}`}
            tab={t}
            isCurrent={currentRoute === t.value}
            onChange={onChange}
          />
        ))
      }
    </View >
  )
}

Tabs.propTypes = {
  currentRoute: string.isRequired,
  onChange: func.isRequired,
  scoringType: string
}

Tabs.defaultProps = {
  bottom: false,
  style: {},
  scoringType: 'points'
}

export default Tabs
