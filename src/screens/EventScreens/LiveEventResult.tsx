import React, { Component } from 'react'
import { View } from 'react-native'
import EventHeader from '../../components/Events/EventHeader'
import ScoringLeaderboard from '../../components/Scoring/ScoringLeaderboard'
import styles from '../../styles'

interface LiveEventResultProps {
  navigation: {
    state?: {
      params?: {
        event: any
      }
    }
  }
}
class LiveEventResult extends Component<LiveEventResultProps, {}> {
  public static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerVisible: true,
    tabBarVisible: false
  })
  public render() {
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
