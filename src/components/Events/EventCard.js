import React from 'react'
import { View } from 'react-native'
import moment from 'moment'
import 'moment/locale/sv'

import AnimatedText from 'shared/AnimatedText'
import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'
import { eventShape } from 'propTypes'
import styles from './eventCardStyles'

const EventCard = ({ event, layoutStyle, onNavigate }) => {
  let gametypeName = ''
  if (event.scoringType === 'modified_points') {
    gametypeName = 'Modifierad Poäng'
  } else if (event.scoringType === 'points') {
    gametypeName = 'Poäng'
  } else {
    gametypeName = 'Slag'
  }
  const date = moment(event.startsAt).format('DD')
  const month = moment(event.startsAt).format('MMM').toUpperCase()
  const startsAt = `${date} ${month}`

  let courseRow = null
  if (event.course) {
    courseRow = (
      <View style={styles.row}>
        <TGText style={styles.course}>{event.course.club}</TGText>
        <TGText style={styles.course}>{event.course.name}</TGText>
      </View>
    )
  } else if (event.oldCourseName) {
    courseRow = <TGText style={styles.course}>{event.oldCourseName}</TGText>
  }

  let mainNavigation = () => onNavigate('EventResult', { event, title: startsAt })
  if (event.status !== 'finished') {
    const setupEventScreen = event.teamEvent ? 'SetupTeamEvent' : 'SetupIndividualEvent'
    mainNavigation = () => onNavigate(setupEventScreen, { event, title: startsAt })
  }

  return (
    <TouchableView
      style={[styles.eventCard, styles[event.status], styles[layoutStyle]]}
      onPress={mainNavigation}
    >
      <View style={styles.dateBox}>
        <TGText style={styles.date}>{date}</TGText>
        <TGText style={styles.month}>{month}</TGText>
      </View>
      <View style={styles.row}>
        {courseRow}
        <TGText style={styles.gametype}>
          {event.teamEvent ? 'Lag' : 'Individuellt'}
          {' ↝ '}
          {gametypeName}
        </TGText>
      </View>

      {event.liveSessions && event.liveSessions.count > 0
        ? <AnimatedText
          onPress={() => onNavigate('LiveEvent', { event })}
          viewStyle={styles.inlineButton}
          style={styles.inlineButtonText}
        >
          LIVE
        </AnimatedText>
        : null
      }
    </TouchableView>
  )
}

EventCard.propTypes = {
  event: eventShape.isRequired,
  onNavigate: React.PropTypes.func.isRequired,
  layoutStyle: React.PropTypes.string
}

EventCard.defaultProps = {
  layoutStyle: ''
}

export default EventCard
