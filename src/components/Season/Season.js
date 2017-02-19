import React from 'react'
import { Switch, Route, withRouter } from 'react-router-native'
import { View } from 'react-native'

import Leaderboard from './Leaderboard/Leaderboard'
import EventList from './Events/EventList'
import NewEventForm from './Events/NewEventForm'
import Event from './Event'
import Tabs from './Tabs'
import styles from '../../styles'

const viewTabs = [
  { value: '/', icon: '🏆', title: 'Ledartavla' },
  { value: '/events', icon: '🗓', title: 'Rundor' }
]

const Season = ({ userId, season, push, replace, goBack, location }) => (
  <View style={styles.container}>
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          <Leaderboard
            userId={userId}
            seasonId={season.id}
            players={season.players}
            seasonName={season.name}
          />
        }
      />
      <Route
        exact
        path="/events"
        render={() =>
          <EventList
            userId={userId}
            seasonId={season.id}
            events={season.events}
            seasonClosed={season.closed}
            gotoEvent={event => push(`/events/${event.id}`, event)}
            openNewRoundModal={() => push('/events/new')}
          />
        }
      />
      <Route
        exact
        path="/events/new"
        render={() =>
          <NewEventForm
            seasonId={season.id}
            goBack={goBack}
          />
        }
      />
      <Route
        exact
        path="/events/:eventId"
        render={() =>
          <Event
            event={location.state}
            userId={userId}
            seasonId={season.id}
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

const { arrayOf, bool, func, shape, string } = React.PropTypes

Season.propTypes = {
  season: shape({
    id: string.isRequired,
    name: string.isRequired,
    closed: bool.isRequired,
    players: arrayOf(shape()).isRequired,
    events: arrayOf(shape()).isRequired
  }).isRequired,
  userId: string.isRequired,
  location: shape({
    pathname: string
  }).isRequired,
  push: func.isRequired,
  goBack: func.isRequired,
  replace: func.isRequired
}

export default withRouter(Season)
