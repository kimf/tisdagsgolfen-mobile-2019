import React from 'react'
import { Switch, Route, withRouter } from 'react-router-native'
import { View } from 'react-native'

import Leaderboard from './Leaderboard/Leaderboard'
import EventList from './Events/EventList'
import NewEventForm from './Events/NewEventForm'
import Tabs from './Tabs'
import styles from '../../styles'

const viewTabs = [
  { value: '/', icon: '🏆', title: 'Ledartavla' },
  { value: '/events', icon: '🗓', title: 'Rundor' }
]

const Season = ({ userId, seasonName, seasonId, push, replace, goBack, location }) => (
  <View style={styles.container}>
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          <Leaderboard
            userId={userId}
            seasonId={seasonId}
            seasonName={seasonName}
          />
        }
      />
      <Route
        exact
        path="/events"
        render={() =>
          <EventList
            userId={userId}
            seasonId={seasonId}
            gotoEvent={eventId => push(`/events/${eventId}`)}
            openNewRoundModal={() => push('/events/new')}
          />
        }
      />
      <Route
        exact
        path="/events/new"
        render={() =>
          <NewEventForm
            seasonId={seasonId}
            goBack={goBack}
          />
        }
      />
    </Switch>
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: '#11111F'
      }}
    >
      <Tabs
        currentRoute={location.pathname}
        onChange={path => replace(path)}
        tabs={viewTabs}
        bottom
      />
    </View>
  </View>
)

const { func, shape, string } = React.PropTypes

Season.propTypes = {
  userId: string.isRequired,
  seasonName: string.isRequired,
  seasonId: string.isRequired,
  location: shape({
    pathname: string
  }).isRequired,
  push: func.isRequired,
  goBack: func.isRequired,
  replace: func.isRequired
}

export default withRouter(Season)
