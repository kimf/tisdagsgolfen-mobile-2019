import React, { PropTypes } from 'react'
import { Button, View, Text, TouchableOpacity, ListView } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

import styles from '../../styles'
import LinkButton from '../Shared/LinkButton'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
// userId, seasonId
const EventSetup = ({ event, playing }) => (
  <View style={styles.container}>
    <View style={styles.inlineHeader}>
      <Text style={styles.centerText}>Vilka spelare för du score för?</Text>
    </View>
    <LinkButton to={`/events/${event.id}/score/addPlayer`} title="Lägg till spelare" />
    <ListView
      ref={(c) => { this.listView = c }}
      initialListSize={100}
      dataSource={ds.cloneWithRows(playing)}
      renderRow={player => (
        <TouchableOpacity
          key={`setup_player_row_${player.id}`}
          style={styles.listrow}
          onPress={() => {}}
        >
          <Text style={[styles.flexOne]}>
            {player.firstName} {player.lastName}
          </Text>
          <Text style={styles.strokeInfo}>Extraslag: {player.strokes}</Text>
        </TouchableOpacity>
      )}
      enableEmptySections
    />

    <LinkButton to={`/events/${event.id}/score/active`} title="Starta runda" />
  </View>
)

const { arrayOf, shape, string, bool } = PropTypes

EventSetup.propTypes = {
  event: shape({
    id: string.isRequired,
    scoringType: string.isRequired,
    status: string.isRequired,
    teamEvent: bool.isRequired,
    club: string,
    course: string
  }).isRequired,
  playing: arrayOf(shape()).isRequired
}


const userQuery = gql`
  query getAllUsers {
    allUsers {
      id
      email
      firstName
      lastName
    }
  }
`

const mapStateToProps = state => (
  {
    playing: state.event.playing
  }
)

// const mapDispatchToProps = dispatch => (
//   {
//     setupEvent: (event) => {
//       dispatch(setupEvent(event))
//     }
//   }
// )

const withRedux = connect(
  mapStateToProps,
)(EventSetup)

export default graphql(userQuery)(withRedux)
