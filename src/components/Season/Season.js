import React, { Component } from 'react'
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

class Season extends Component {
  render() {
    const { user, season, push, replace, goBack, location } = this.props

    return (
      <View style={styles.container}>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              <Leaderboard
                user={user}
                items={season.seasonLeaderboards}
                seasonName={season.name}
              />
            }
          />
          <Route
            exact
            path="/events"
            render={() =>
              <EventList
                user={user}
                events={season.events}
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
                goBack={goBack}
                selectCourse={course => push('/events/new/finalize', { course })}
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
  }
}

const { func, shape, string } = React.PropTypes

Season.propTypes = {
  user: shape().isRequired,
  season: shape().isRequired,
  location: shape({
    pathname: string
  }).isRequired,
  push: func.isRequired,
  goBack: func.isRequired,
  replace: func.isRequired
}

export default withRouter(Season)
