import React, { Component, PropTypes } from 'react'
import { Switch, Route, withRouter } from 'react-router-native'
import { View } from 'react-native'

import Leaderboard from './Leaderboard'
import EventList from './EventList'
import Tabs from './Tabs'
import styles from '../styles'

const viewTabs = [
  { value: '/', icon: '🏆', title: 'Ledartavla' },
  { value: '/events', icon: '🗓', title: 'Rundor' }
]

class Season extends Component {
  gotoEvent = eventId => this.props.replace(`/events/${eventId}`)

  render() {
    const { user, season, currentPath, replaceRoute } = this.props

    return (
      <View style={styles.container}>
        <Switch>
          <Route
            exact
            path="/"
            user={user}
            items={season.seasonLeaderboards}
            seasonName={season.name}
            component={Leaderboard}
          />
          <Route
            exact
            path="/events"
            user={user}
            events={season.events}
            gotoEvent={this.gotoEvent}
            component={EventList}
          />
        </Switch>
        <Tabs
          currentRoute={currentPath}
          onChange={path => replaceRoute(path)}
          tabs={viewTabs}
          bottom
        />
      </View>
    )
  }
}


Season.propTypes = {
  user: PropTypes.shape.isRequired,
  season: PropTypes.shape.isRequired,
  replace: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
  replaceRoute: PropTypes.func.isRequired
}

export default withRouter(Season)

