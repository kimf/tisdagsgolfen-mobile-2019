import React, { Component, PropTypes } from 'react'
import { View, LayoutAnimation } from 'react-native'
import { withRouter, Switch, Route, Redirect } from 'react-router-native'
import { BottomNavigation, Tab } from 'react-router-navigation'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'immutability-helper'

import Loading from '../components/Shared/Loading'
import Leaderboard from '../components/Season/Leaderboard/Leaderboard'
import Profile from '../components/Profile'
import EventList from '../components/Season/Events/EventList'

import styles from '../styles'

const { arrayOf, bool, func, shape, string } = PropTypes
const blue = 'hsl(200, 50%, 50%)'

class Home extends Component {
  static propTypes = {
    data: shape({
      loading: bool.isRequired,
      user: shape({
        id: string
      }),
      seasons: arrayOf(shape({
        id: string,
        name: string,
        closed: bool,
        photo: shape({ url: string }),
        players: arrayOf(shape()),
        events: arrayOf(shape())
      }))
    }).isRequired,
    onLogout: func.isRequired,
    match: shape().isRequired
  }

  static defaultProps = {
    match: { url: '' }
  }

  state = { currentSeasonId: null }

  componentWillReceiveProps(newProps) {
    const { seasons, loading } = this.props.data
    const { currentSeasonId } = this.state
    if (loading || !currentSeasonId) {
      return
    }
    const events = seasons.find(s => s.id === currentSeasonId).events
    const newEvents = newProps.data.seasons.find(s => s.id === currentSeasonId).events

    if (!newProps.data.loading) {
      if (this.subscription) {
        if (newEvents !== events) {
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
        variables: { seasonId: currentSeasonId },

        // this is where the magic happens.
        updateQuery: (prev, { subscriptionData }) => {
          const newEvent = subscriptionData.data.createEvent
          const seasonIndex = prev.seasons.findIndex(s => s.id === currentSeasonId)
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
          // eslint-disable-next-line no-console
          console.log('GOT NEW EVENT', newEvent)
          return update(prev, {
            seasons: {
              [seasonIndex]: {
                events: {
                  $push: [newEvent]
                }
              }
            }
          })
        },
        // eslint-disable-next-line no-console
        onError: err => console.error(err)
      })
    }
  }

  getCurrentSeason = () => {
    const { currentSeasonId } = this.state
    const { seasons } = this.props.data

    return currentSeasonId
           ? seasons.find(s => s.id === currentSeasonId)
           : seasons[0]
  }

  changeSeason = (currentSeasonId) => {
    this.setState({ currentSeasonId })
  }

  render() {
    const { onLogout, match } = this.props
    const { loading, user, seasons } = this.props.data
    if (loading) {
      return (
        <View style={styles.container}>
          <Loading text="Startar golfbilarna..." />
        </View>
      )
    }

    return (
      <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: '#eee' }}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to={`${match.url}/leaderboard`} />}
          />
          <Route
            path="/"
            render={() => (
              <View style={{ flex: 1 }}>
                <BottomNavigation labelStyle={({ isActive }) => isActive && { color: blue }}>
                  <Tab
                    path="/leaderboard"
                    label="🏆 Ledartavla"
                    render={() => {
                      const currentSeason = this.getCurrentSeason()
                      return (
                        <Leaderboard
                          userId={user.id}
                          seasonId={currentSeason.id}
                          closed={currentSeason.closed}
                          photoUrl={currentSeason.photo ? currentSeason.photo.url : ''}
                          players={currentSeason.players}
                          seasonName={currentSeason.name}
                          seasons={seasons.map(s => Object.assign({ id: s.id, name: s.name }))}
                          onChangeSeason={this.changeSeason}
                        />
                      )
                    }}
                  />
                  <Tab
                    path="/events"
                    render={() => {
                      const currentSeason = this.getCurrentSeason()
                      return (
                        <EventList
                          events={currentSeason.events}
                          seasonClosed={currentSeason.closed}
                          seasonId={currentSeason.id}
                          userId={user.id}
                        />
                      )
                    }}
                    label="🗓 Rundor"
                  />
                  <Tab
                    path="/profile"
                    render={() => <Profile onLogout={onLogout} user={user} />}
                    label="🏌 Profil"
                  />
                </BottomNavigation>
              </View>
            )}
          />
        </Switch>
      </View>
    )
  }
}

const seasonQuery = gql`
  query {
    user {
      id
      email
      firstName
      lastName
    }
    seasons: allSeasons(
      orderBy: name_DESC
    ) {
      id
      name
      closed
      photo {
        url
      }
      players: seasonLeaderboards (orderBy: position_DESC) {
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
      events (orderBy: startsAt_DESC) {
        id
        status
        startsAt
        course
        courseId
        scoringType
        teamEvent
      }
    }
  }
`

const HomeWithData = graphql(seasonQuery, {
  options: () => ({ forceFetch: false })
})(Home)

export default withRouter(HomeWithData)
