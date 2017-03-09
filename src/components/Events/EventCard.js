import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import moment from 'moment'
import 'moment/locale/sv'

import LinkButton from '../Shared/LinkButton'

import { navigatorStyle } from '../../styles'

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

const EventCard = ({ event, userId, navigator }) => {
  let gametypeName = ''
  if (event.scoringType === 'modified_points') {
    gametypeName = 'Modifierad Poäng'
  } else if (event.scoringType === 'points') {
    gametypeName = 'Poäng'
  } else {
    gametypeName = 'Slag'
  }
  const startsAt = moment(event.startsAt).format('DD MMM')

  let titleText = 'Resultat'
  if (event.status === 'live') {
    titleText = 'Live'
  } else if (event.status === 'planned') {
    titleText = 'Scora'
  }
  const title = `${titleText} ${startsAt}`

  const navigatorProps = {
    title,
    passProps: { event, userId },
    animated: true,
    navigatorStyle: {
      ...navigatorStyle,
      tabBarHidden: true
    }
  }

  return (
    <View style={[s.eventCard, s[event.status]]}>
      <View style={s.row}>
        <Text style={[s.date]}>
          {startsAt}
        </Text>

        <Text style={s.gametype}>
          {event.teamEvent ? 'Lag' : 'Individuellt'}
          {' ↝ '}
          {gametypeName}
        </Text>
      </View>

      <View style={s.row}>
        <Text style={s.course}>{event.club}</Text>
        <Text style={s.course}>{event.course}</Text>
      </View>
      <View style={[s.row, s.rightRow]}>
        { event.status === 'finished'
          ? <LinkButton
            onPress={() => {
              navigator.push({
                ...navigatorProps,
                screen: 'tisdagsgolfen.EventResult'
              })
            }}
            title="Se Resultat"
            backgroundColor="#7f8c8d"
            color="white"
          />
          : null
        }
        { event.status === 'live'
          ? <LinkButton
            onPress={() => {
              navigator.push({
                ...navigatorProps,
                screen: 'tisdagsgolfen.LiveEvent'
              })
            }}
            title="FÖLJ LIVE"
            backgroundColor="#f39c12"
            color="white"
          />
          : null
        }
        { event.status !== 'finished'
          ? <LinkButton
            onPress={() => {
              navigator.showModal({
                ...navigatorProps,
                screen: 'tisdagsgolfen.ScoreEvent'
              })
            }}
            title="SCORA"
            backgroundColor="#16a085"
            color="white"
          />
          : null
        }
      </View>
    </View>
  )
}

const { shape, string, bool } = React.PropTypes

EventCard.propTypes = {
  event: shape({
    id: string.isRequired,
    scoringType: string.isRequired,
    status: string.isRequired,
    teamEvent: bool.isRequired,
    club: string,
    course: string
  }).isRequired,
  navigator: shape().isRequired,
  userId: string.isRequired
}

export default EventCard
