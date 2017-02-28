import React, { Component, PropTypes } from 'react'
import { View, Text, ListView } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import EventLeaderboardCard from './Events/EventLeaderboardCard'
import Loading from '../Shared/Loading'

import styles from '../../styles'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Event extends Component {
  render() {
    const { event, data, userId } = this.props
    let gametypeName = ''
    if (event.scoringType === 'modified_points') {
      gametypeName = 'Modifierad Poäng'
    } else if (event.scoringType === 'points') {
      gametypeName = 'Poäng'
    } else {
      gametypeName = 'Slag'
    }

    return (
      <View style={styles.container}>
        <Text style={[styles.inlineHeader, { backgroundColor: '#ccc', textAlign: 'center' }]}>
          {event.course}
          {' / '}
          {event.teamEvent ? 'Lag' : 'Individuellt'}
          {' / '}
          {gametypeName}
        </Text>

        { data.loading
          ? <Loading text="Laddar resultat..." />
          : <View>
            <View style={[styles.listrow]}>
              <Text style={{ fontSize: 10, flex: 1 }} />
              <Text style={{ fontSize: 10, flex: 2 }}>Spelare</Text>
              <Text style={{ fontSize: 10, flex: 1 }}>{event.scoringType === 'points' ? 'Poäng' : 'Slag'}</Text>
              <Text style={{ fontSize: 10, flex: 1 }}>Rundor</Text>
              <Text style={{ fontSize: 10, flex: 1 }}>Snitt</Text>
              <Text style={{ fontSize: 10, flex: 1 }}>Total</Text>
              <Text style={{ fontSize: 10, flex: 1 }}>Öl</Text>
              <Text style={{ fontSize: 10, flex: 1 }}>Kr</Text>
              <Text style={{ fontSize: 10, flex: 1 }}>Tour Poäng</Text>
            </View>
            <ListView
              initialListSize={30}
              dataSource={ds.cloneWithRows(data.players)}
              ref={(ref) => { this.listView = ref }}
              renderRow={rowData =>
                <EventLeaderboardCard key={`l_${event.id}`} currentUserId={userId} data={rowData} />
              }
              enableEmptySections
            />
          </View>
        }
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
    players: arrayOf(shape())
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
