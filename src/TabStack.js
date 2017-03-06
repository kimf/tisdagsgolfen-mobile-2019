import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import { BottomNavigation, Tab } from 'react-router-navigation'

import Leaderboard from './containers/Leaderboard'
import Profile from './components/Profile'
import EventList from './components/Season/Events/EventList'

const labelStyle = isActive => (
  {
    color: (isActive ? '#27ae60' : '#7f8c8d'),
    fontSize: 12,
    marginVertical: 3,
    fontWeight: (isActive ? 'bold' : 'normal')
  }
)

const TabStack = ({ currentSeason, user, onLogout }) => (
  <View style={{ flex: 1 }}>
    <BottomNavigation
      currentSeason={currentSeason}
      labelStyle={({ isActive }) => labelStyle(isActive)}
    >
      <Tab
        path="/leaderboard"
        label="Ledartavla"
        renderTabIcon={() => <Text>🏆</Text>}
        render={() => <Leaderboard season={currentSeason} userId={user.id} />}
      />
      <Tab
        path="/events"
        render={() => (
          <EventList
            events={currentSeason.events}
            seasonId={currentSeason.id}
            seasonClosed={currentSeason.closed}
            seasonHasBeerAndKr={parseInt(currentSeason.name, 10) > 2015}
            userId={user.id}
          />
        )}
        renderTabIcon={() => <Text>🗓</Text>}
        label="Rundor"
      />
      <Tab
        path="/profile"
        render={() => <Profile onLogout={onLogout} user={user} />}
        renderTabIcon={() => <Text>🏌</Text>}
        label="Profil"
      />
    </BottomNavigation>
  </View>
)

const { shape, string, bool, arrayOf, func } = PropTypes

TabStack.propTypes = {
  user: shape({
    id: string.isRequired
  }).isRequired,
  currentSeason: shape({
    id: string,
    name: string,
    closed: bool,
    photo: shape({ url: string }),
    players: arrayOf(shape()),
    events: arrayOf(shape())
  }).isRequired,
  onLogout: func.isRequired
}

export default TabStack
