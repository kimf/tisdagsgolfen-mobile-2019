import React from 'react'
import { View } from 'react-native'
import moment from 'moment'
import 'moment/locale/sv'
import { func, string } from 'prop-types'

import { colors } from 'styles'
import AnimatedText from 'shared/AnimatedText'
import TGText from 'shared/TGText'
import RowButton from 'shared/RowButton'
import { eventShape } from 'propTypes'
import styles from './eventCardStyles'

const EventCard = ({ event, userId, onNavigate }) => {
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

  const ownScoringSession = event.scoringSessions.find(ss => ss.scorer.id === userId)
  const setupEventScreen = event.teamEvent ? 'SetupTeamEvent' : 'SetupIndividualEvent'
  const mainNavigation = ownScoringSession
    ? () => onNavigate('ScoreEvent', { scoringSessionId: ownScoringSession.id })
    : () => onNavigate(setupEventScreen, { event, title: startsAt })

  const liveNavigation = () => onNavigate('LiveEventResult', { event, title: 'Live Resultat' })
  const resultNavigation = () => onNavigate('EventResult', { event, title: 'Resultat' })

  const liveSessions = event.scoringSessions.filter(ss => ss.status === 'live')

  const scoringTitle = ownScoringSession ? 'Ändra score' : 'För score'
  const scoringBackground = ownScoringSession ? colors.red : colors.dark

  const isInFlux = event.status !== 'finished'
  const resultTitle = isInFlux ? 'Följ Live' : 'Se Resultat'
  const resultBackground = isInFlux ? colors.yellow : colors.green

  return (
    <View style={styles.eventCard}>
      <View style={styles.dateBox}>
        <TGText style={styles.date}>{date}</TGText>
        <TGText style={styles.month}>{month}</TGText>
        {liveSessions.length > 0
          ? <AnimatedText style={styles.inlineButtonText} >
            LIVE
          </AnimatedText>
          : null
        }
      </View>
      <View style={styles.row}>
        {courseRow}
        <TGText style={styles.gametype}>
          {event.teamEvent ? 'Lag' : 'Individuellt'}
          {' ↝ '}
          {gametypeName}
        </TGText>

        <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 10, justifyContent: 'space-between' }}>
          {event.scoringSessions.length > 0 && event.status !== 'finished'
            ? <RowButton
              onPress={liveNavigation}
              title={resultTitle}
              backgroundColor={resultBackground}
            />
            : null
          }
          {isInFlux
            ? <RowButton
              onPress={mainNavigation}
              title={scoringTitle}
              backgroundColor={scoringBackground}
            />
            : <RowButton
              onPress={resultNavigation}
              title="Se Resultat"
              backgroundColor={colors.green}
            />
          }
        </View>
      </View>
    </View>
  )
}

EventCard.propTypes = {
  userId: string.isRequired,
  event: eventShape.isRequired,
  onNavigate: func.isRequired
}

export default EventCard
