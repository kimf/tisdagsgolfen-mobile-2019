import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableOpacity, ListView } from 'react-native'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

import styles from '../../styles'
import LinkButton from '../../components/Shared/LinkButton'

import { cancelEvent } from '../../reducers/event'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
// userId, seasonId
class ScoreEvent extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Avbryt',
        id: 'cancel'
      }
    ]
  }

  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  state = { course: null }

  onNavigatorEvent = (event) => {
    const { navigator, onCancelEvent } = this.props
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        onCancelEvent()
        navigator.dismissModal()
      }
    }
  }

  render() {
    const { playing } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.inlineHeader}>
          <Text style={styles.centerText}>Vilka spelare för du score för?</Text>
        </View>
        <LinkButton onPress={() => {}} title="Lägg till spelare" />
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

        <LinkButton onPress={() => {}} title="Starta runda" />
      </View>
    )
  }
}

const { arrayOf, shape, func } = PropTypes

ScoreEvent.propTypes = {
  // event: shape({
  //   id: string.isRequired,
  //   scoringType: string.isRequired,
  //   status: string.isRequired,
  //   teamEvent: bool.isRequired,
  //   club: string,
  //   course: string
  // }).isRequired,
  playing: arrayOf(shape()).isRequired,
  navigator: shape().isRequired,
  onCancelEvent: func.isRequired
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

const mapDispatchToProps = dispatch => (
  {
    onCancelEvent: () => {
      dispatch(cancelEvent())
    }
  }
)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(userQuery)
)(ScoreEvent)
