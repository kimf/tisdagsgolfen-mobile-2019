import React, { Component, PropTypes } from 'react'
import { Switch, Route, withRouter } from 'react-router-native'
import { View } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'immutability-helper'

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

const { arrayOf, bool, func, shape, string } = PropTypes

class Season extends Component {
  static propTypes = {
    season: shape({
      id: string.isRequired,
      name: string.isRequired,
      closed: bool.isRequired
    }).isRequired,
    data: shape({
      loading: bool.isRequired,
      players: arrayOf(shape()),
      events: arrayOf(shape())
    }).isRequired,
    userId: string.isRequired,
    location: shape({
      pathname: string
    }).isRequired,
    push: func.isRequired,
    goBack: func.isRequired,
    replace: func.isRequired
  }

  componentWillReceiveProps(newProps) {
    const { events } = this.props.data

    if (!newProps.data.loading) {
      if (this.subscription) {
        if (newProps.data.events !== events) {
          // if the feed has changed, we need to unsubscribe before resubscribing
          this.subscription()
        } else {
          // we already have an active subscription with the right params
          return
        }
      }

      this.subscription = newProps.data.subscribeToMore({
        document: gql`
          subscription($seasonId: ID!) {
            createEvent(
              filter: { season: { id: $seasonId } }
            ) {
              id
              status
              startsAt
              course
              courseId
              scoringType
              teamEvent
              oldId
            }
          }
        `,
        variables: { seasonId: this.props.season.id },

        // this is where the magic happens.
        updateQuery: (prev, { subscriptionData }) => {
          const newEvent = subscriptionData.data.createEvent

          // eslint-disable-next-line no-console
          console.log('GOT NEW EVENT', newEvent)

          return update(prev, {
            events: {
              $push: [newEvent]
            }
          })
        },
        // eslint-disable-next-line no-console
        onError: err => console.error(err)
      })
    }
  }

  render() {
    const { userId, season, data, push, replace, goBack, location } = this.props
    if (data.loading) { return null }

    return (
      <View style={styles.container}>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              <Leaderboard
                userId={userId}
                seasonId={season.id}
                players={data.players}
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
                events={data.events}
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
  }
}

const seasonQuery = gql`
  query seasonQuery($seasonId: ID!) {
    players: allSeasonLeaderboards (
      orderBy: position_DESC,
      filter: { season: { id: $seasonId } }
    ) {
      id
      averagePoints
      position
      previousPosition
      totalPoints
      totalBeers
      totalKr
      top5Points
      eventCount
      user {
        id
        firstName
        lastName
      }
    }
    events: allEvents (
      orderBy: startsAt_DESC,
      filter: { season: { id: $seasonId } }
    ) {
      id
      status
      startsAt
      course
      courseId
      scoringType
      teamEvent
    }
  }
`

const SeasonWithData = graphql(seasonQuery, {
  options: ({ season }) => ({ forceFetch: true, variables: { seasonId: season.id } })
})(Season)

export default withRouter(SeasonWithData)
