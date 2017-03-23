import React from 'react'
import { View, StyleSheet } from 'react-native'
import moment from 'moment'
import 'moment/locale/sv'

import TGText from 'shared/TGText'

const s = StyleSheet.create({
  /* EVENT CARDS */
  eventCard: {
    flexDirection: 'column',
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 8 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 5
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5
  },

  rightRow: {
    justifyContent: 'flex-end'
  },

  date: {
    color: '#000',
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 5
  },

  course: {
    fontSize: 14
  },

  gametype: {
    fontSize: 12,
    paddingVertical: 7,
    color: '#777'
  }
})

const EventCard = ({ event, onNavigate }) => {
  let gametypeName = ''
  if (event.scoringType === 'modified_points') {
    gametypeName = 'Modifierad Poäng'
  } else if (event.scoringType === 'points') {
    gametypeName = 'Poäng'
  } else {
    gametypeName = 'Slag'
  }
  const startsAt = moment(event.startsAt).format('DD MMM')

  const setupEventScreen = event.teamEvent ? 'SetupTeamEvent' : 'SetupIndividualEvent'

  let courseRow = null
  if (event.course) {
    courseRow = (
      <View style={s.row}>
        <TGText style={s.course}>{event.course.club}</TGText>
        <TGText style={s.course}>{event.course.name}</TGText>
      </View>
    )
  } else if (event.oldCourseName) {
    courseRow = (
      <View style={s.row}>
        <TGText style={s.course}>{event.oldCourseName}</TGText>
      </View>
    )
  }

  return (
    <View style={[s.eventCard, s[event.status]]}>
      <View style={s.row}>
        <TGText style={[s.date]}>
          {startsAt}
        </TGText>

        <TGText style={s.gametype}>
          {event.teamEvent ? 'Lag' : 'Individuellt'}
          {' ↝ '}
          {gametypeName}
        </TGText>
      </View>

      {courseRow}

      <View style={[s.row, s.rightRow]}>
        {event.status === 'live'
          ? <TGText
            onPress={() => onNavigate('LiveEvent', { event })}
            viewStyle={{ marginRight: 16 }}
            style={{ color: '#f39c12', fontWeight: 'bold' }}
          >
            FÖLJ LIVE
          </TGText>
          : null
        }
        {event.status === 'finished'
          ? <TGText
            onPress={() => onNavigate('EventResult', { event, title: startsAt })}
            backgroundColor="#7f8c8d"
            color="white"
          >
            SE RESULTAT
          </TGText>
          : <TGText
            onPress={() => onNavigate(setupEventScreen, { event })}
            backgroundColor="#16a085"
            color="white"
          >
            SCORA
          </TGText>
        }
      </View>
    </View>
  )
}

const { shape, string, bool, func } = React.PropTypes

EventCard.propTypes = {
  event: shape({
    id: string.isRequired,
    scoringType: string.isRequired,
    status: string.isRequired,
    teamEvent: bool.isRequired,
    oldCourseName: string,
    course: shape({
      club: string,
      course: string
    })
  }).isRequired,
  onNavigate: func.isRequired
}

export default EventCard
