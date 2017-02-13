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
  gotoEvent = eventId => this.props.replace(`/events/${eventId}`)
  openNewRoundModal = () => this.props.push('/events/new')

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
            openNewRoundModal={this.openNewRoundModal}
            component={EventList}
          />
          <Route
            exact
            path="/events/new"
            goBack={this.goBack}
            component={NewEventForm}
          />
        </Switch>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: '#11111F'
          }}
        >
          <Tabs
            currentRoute={currentPath}
            onChange={path => replaceRoute(path)}
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
  replace: func.isRequired,
  currentPath: string.isRequired,
  replaceRoute: func.isRequired,
  push: func.isRequired
}

export default withRouter(Season)

