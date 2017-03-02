import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

// import update from 'immutability-helper'

import TabStack from '../TabStack'
import Loading from '../components/Shared/Loading'

import styles from '../styles'

const { arrayOf, bool, func, shape, string } = PropTypes

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
    currentSeasonId: string,
    onLogout: func.isRequired
  }

  static defaultProps = {
    currentSeasonId: null,
    match: { url: '' }
  }

  // componentWillReceiveProps(newProps) {
  //   const { loading } = this.props.data
  //   const { currentSeasonId } = this.props
  //   if (loading || !currentSeasonId) {
  //     return
  //   }
  //   const events = this.getCurrentSeason().events
  //   const newEvents = newProps.data.seasons.find(s => s.id === currentSeasonId).events

  //   if (!newProps.data.loading) {
  //     if (this.subscription) {
  //       if (newEvents !== events) {
  //         // if the feed has changed, we need to unsubscribe before resubscribing
  //         this.subscription()
  //       } else {
  //         // we already have an active subscription with the right params
  //         return
  //       }
  //     }

  //     this.subscription = newProps.data.subscribeToMore({
  //       document: gql`
  //         subscription($seasonId: ID!) {
  //           createEvent(
  //             filter: { season: { id: $seasonId } }
  //           ) {
  //             id
  //             status
  //             startsAt
  //             course
  //             courseId
  //             scoringType
  //             teamEvent
  //             oldId
  //           }
  //         }
  //       `,
  //       variables: { seasonId: currentSeasonId },

  //       // this is where the magic happens.
  //       updateQuery: (prev, { subscriptionData }) => {
  //         const newEvent = subscriptionData.data.createEvent
  //         const seasonIndex = prev.seasons.findIndex(s => s.id === currentSeasonId)
  //         LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  //         // eslint-disable-next-line no-console
  //         console.log('GOT NEW EVENT', newEvent)
  //         return update(prev, {
  //           seasons: {
  //             [seasonIndex]: {
  //               events: {
  //                 $push: [newEvent]
  //               }
  //             }
  //           }
  //         })
  //       },
  //       // eslint-disable-next-line no-console
  //       onError: err => console.error(err)
  //     })
  //   }
  // }

  render() {
    const { onLogout, currentSeasonId } = this.props
    const { loading, user, seasons } = this.props.data

    if (loading) {
      return (
        <View style={styles.container}>
          <Loading text="Startar golfbilarna..." />
        </View>
      )
    }

    if (!currentSeasonId) {
      return (
        <View style={styles.container}>
          <Loading text="Brum brum..." />
        </View>
      )
    }

    const currentSeason = seasons.find(s => s.id === currentSeasonId)

    const props = { currentSeason, user, onLogout }

    return (
      <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: '#eee' }}>
        <TabStack {...props} key={currentSeasonId} />
      </View>
    )
  }
}

const seasonQuery = gql`
  query getAllSeasons {
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


const mapStateToProps = state => (
  {
    currentSeasonId: state.season.seasonId
  }
)

const withRedux = connect(
  mapStateToProps,
)(Home)

export default graphql(seasonQuery, {
  options: () => ({ forceFetch: false })
})(withRedux)
