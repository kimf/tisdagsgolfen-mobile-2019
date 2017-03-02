import React, { PropTypes } from 'react'
import { BottomNavigation, Tab } from 'react-router-navigation'
import { View } from 'react-native'

import Leaderboard from './containers/Leaderboard'
import Profile from './components/Profile'
import EventList from './components/Season/Events/EventList'

const blue = 'hsl(200, 50%, 50%)'

const TabStack = ({ currentSeason, user, onLogout }) => (
  <View style={{ flex: 1 }}>
    <BottomNavigation
      labelStyle={({ isActive }) => isActive && { color: blue }}
      currentSeason={currentSeason}
    >
      <Tab
        path="/"
        label="🏆 Ledartavla"
        render={() => <Leaderboard season={currentSeason} userId={user.id} />}
      />
      <Tab
        path="/events"
        render={() => (
          <EventList
            events={currentSeason.events}
            seasonId={currentSeason.id}
            seasonClosed={currentSeason.closed}
            userId={user.id}
          />
        )}
        label="🗓 Rundor"
      />
      <Tab
        path="/profile"
        render={() => <Profile onLogout={onLogout} user={user} />}
        label="🏌 Profil"
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
