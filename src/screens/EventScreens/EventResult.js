import React, { Component, PropTypes } from 'react'
import { View, ListView } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import EventHeader from 'Events/EventHeader'
import EventLeaderboardCard from 'Events/EventLeaderboardCard'
import Tabs from 'shared/Tabs'
import Loading from 'shared/Loading'

import { ranked } from 'utils'
import styles from 'styles'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Event extends Component {
  static navigatorStyle = {
    navBarTextColor: 'white',
    navBarBackgroundColor: '#1E98DF'
  }

  state = { sorting: 'totalPoints' }

  changeSort = (sorting) => {
    this.listView.scrollTo({ x: 0, y: 0, animated: true })
    this.setState({ sorting })
  }

  render() {
    const { event, data, userId } = this.props
    const { sorting } = this.state

    const eventHeader = <EventHeader {...event} />

    if (data.loading) {
      return (
        <View style={styles.container}>
          {eventHeader}
          <Loading text="Laddar resultat..." />
        </View>
      )
    }

    let sortedPlayers = null
    let sorted = null
    if (sorting === 'beers') {
      sorted = data.players.slice().sort((a, b) => b.score.beers - a.score.beers)
      sortedPlayers = ranked(sorted, 'beerPos', 'totalBeers')
    } else if (sorting === 'kr') {
      sorted = data.players.slice().sort((a, b) => a.score.kr - b.score.kr)
      sortedPlayers = ranked(sorted, 'krPos', 'totalKr')
    } else {
      sortedPlayers = data.players.slice().sort((a, b) => a.position - b.position)
    }

    return (
      <View style={styles.container}>
        { eventHeader }
        <Tabs
          currentRoute={sorting}
          onChange={sort => this.changeSort(sort)}
        />

        <ListView
          initialListSize={20}
          dataSource={ds.cloneWithRows(sortedPlayers)}
          ref={(ref) => { this.listView = ref }}
          renderRow={rowData =>
            <EventLeaderboardCard
              key={`l_${userId}`}
              scoringType={event.scoringType}
              currentUserId={userId}
              data={rowData}
              sorting={sorting}
            />
          }
          enableEmptySections
        />
      </View>
    )
  }
}

const { arrayOf, shape, string, bool } = PropTypes

Event.propTypes = {
  event: shape({
    id: string.isRequired,
    scoringType: string.isRequired,
    status: string.isRequired,
    teamEvent: bool.isRequired,
    club: string,
    course: string
  }).isRequired,
  data: shape({
    loading: bool,
    players: arrayOf(EventLeaderboardCard.propTypes.data)
  }),
  userId: string.isRequired
}

Event.defaultProps = {
  data: {
    loading: true,
    players: []
  }
}

const eventQuery = gql`
  query eventQuery($eventId: ID!) {
    players: allEventLeaderboards(
      orderBy: position_ASC,
      filter: { event: { id: $eventId } }
    ) {
      id
      position
      previousTotalPosition
      totalAveragePoints
      totalEventCount
      totalEventPoints
      totalPosition
      score {
        id
        beers
        eventPoints
        kr
        value
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`


export default graphql(eventQuery, {
  options: ({ event }) => ({ variables: { eventId: event.id } })
})(Event)
