import React from 'react'
import { View } from 'react-native'
import { bool, string, func } from 'prop-types'

import Tab from 'shared/Tab'
import TGText from 'shared/TGText'
import styles from 'styles'

const Tabs = ({
  currentRoute, onChange, scoringType, teamEvent, leaderboard
}) => {
  const strokes = scoringType === 'strokes'
  const tabs = leaderboard
    ? [
      { value: 'season', icon: '🤷', title: 'Totalt' },
      { value: 'beers', icon: '🍻', title: 'Veckoresultat' }
    ]
    : [
      { value: 'totalPoints', icon: '🤷', title: strokes ? 'Slag' : 'Poäng' },
      { value: 'beers', icon: '🍻', title: 'Öl' }
    ]

  if (!leaderboard && !teamEvent) {
    tabs.push({ value: 'kr', icon: '💸', title: 'Skuld' })
  }

  return (
    <View style={styles.tabs} key={`tabs_${leaderboard ? 'leaderbard' : 'sorting'}`}>
      {!leaderboard && (
        <TGText style={{ paddingHorizontal: 10, fontSize: 10 }}>Sortera efter: </TGText>
      )}
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
  leaderboard: bool,
  currentRoute: string.isRequired,
  onChange: func.isRequired,
  teamEvent: bool,
  scoringType: string
}

Tabs.defaultProps = {
  leaderboard: false,
  scoringType: 'points',
  teamEvent: false
}

export default Tabs
