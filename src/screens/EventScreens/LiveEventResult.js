import React, { Component } from 'react'
import { View } from 'react-native'
import { shape } from 'prop-types'

import EventHeader from 'Events/EventHeader'
import ScoringLeaderboard from 'Scoring/ScoringLeaderboard'

import styles from 'styles'
import { eventShape } from 'propTypes'

class LiveEventResult extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerVisible: true,
    tabBarVisible: false
  })

  static propTypes = {
    navigation: shape({
      state: shape({
        params: shape({
          event: eventShape.isRequired
        })
      })
    }).isRequired
  }

  render() {
    const { navigation } = this.props
    const { event } = navigation.state.params

    const eventHeader = (
      <EventHeader
        course={event.course}
        oldCourseName={event.oldCourseName}
        teamEvent={event.teamEvent}
        scoringType={event.scoringType}
      />
    )

    return (
      <View style={styles.container}>
        {eventHeader}
        <ScoringLeaderboard
          eventId={event.id}
          showClose={false}
          scoringType={event.scoringType}
          teamEvent={event.teamEvent}
        />
      </View>
    )
  }
}

// const mapStateToProps = state => ({ currentUserId: state.app.currentUser.id })

export default LiveEventResult
