import React from 'react'
import { Modal, View, Text, ListView } from 'react-native'
import NavigationBar from 'react-native-navbar'
import moment from 'moment'
import 'moment/locale/sv'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import EventLeaderboardCard from './Events/EventLeaderboardCard'
import Loading from '../Shared/Loading'

import styles from '../../styles'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const Event = ({ event, data, userId, goBack }) => {
  let gametypeName = ''
  if (event.scoringType === 'modified_points') {
    gametypeName = 'Modifierad Poäng'
  } else if (event.scoringType === 'points') {
    gametypeName = 'Poäng'
  } else {
    gametypeName = 'Slag'
  }

  const startsAt = moment(event.startsAt).format('ddd DD MMM').toUpperCase()

  const titleConfig = { title: startsAt, tintColor: 'white' }
  const leftButtonConfig = {
    title: 'Stäng',
    handler: () => goBack(),
    tintColor: '#fff'
  }

  // {event.club} -

  return (
    <Modal
      animationType={'slide'}
      transparent={false}
      onRequestClose={() => {}}
      visible
      hardwareAccelerated
    >
      <View style={styles.container}>
        <NavigationBar
          style={styles.header}
          statusBar={{ style: 'light-content', tintColor: '#000' }}
          title={titleConfig}
          leftButton={leftButtonConfig}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.inlineHeader}>
            {event.teamEvent ? 'Lag' : 'Individuellt'}
            {' ↝ '}
            {gametypeName}
            {' ↝ '}
            {event.course}
          </Text>

          { data.loading
            ? <Loading text="Laddar resultat..." />
            : <ListView
              initialListSize={30}
              dataSource={ds.cloneWithRows(data.players)}
              ref={(ref) => { this.listView = ref }}
              renderRow={rowData =>
                <EventLeaderboardCard key={`l_${event.id}`} gameType={gametypeName} currentUserId={userId} data={rowData} />
              }
              enableEmptySections
            />
          }
        </View>
      </View>
    </Modal>
  )
}

const { arrayOf, shape, string, bool, func } = React.PropTypes

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
  userId: string.isRequired,
  goBack: func.isRequired
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
