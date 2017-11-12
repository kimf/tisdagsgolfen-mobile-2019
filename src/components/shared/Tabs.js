import React from 'react'
import { View } from 'react-native'
import { bool, string, func } from 'prop-types'

import Tab from 'shared/Tab'
import { colors } from 'styles'

const Tabs = ({
  currentRoute, onChange, scoringType, teamEvent
}) => {
  const strokes = scoringType === 'strokes'
  const tabs = [
    { value: 'totalPoints', icon: '🤷', title: strokes ? 'Slag' : 'Poäng' },
    { value: 'beers', icon: '🍻', title: 'Öl' }
  ]

  if (!teamEvent) {
    tabs.push({ value: 'kr', icon: '💸', title: 'Skuld' })
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        backgroundColor: colors.lightGray,
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
      key="tabs_sorting"
    >
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
}

Tabs.propTypes = {
  currentRoute: string.isRequired,
  onChange: func.isRequired,
  teamEvent: bool,
  scoringType: string
}

Tabs.defaultProps = {
  scoringType: 'points',
  teamEvent: false
}

export default Tabs
