import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import moment from 'moment'
import 'moment/locale/sv'

import LinkButton from '../../Shared/LinkButton'

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

const EventCard = ({ event, userId, push }) => {
  let gametypeName = ''
  if (event.scoringType === 'modified_points') {
    gametypeName = 'Modifierad Poäng'
  } else if (event.scoringType === 'points') {
    gametypeName = 'Poäng'
  } else {
    gametypeName = 'Slag'
  }

  return (
    <View style={[s.eventCard, s[event.status]]}>
      <View style={s.row}>
        <Text style={[s.date]}>
          {moment(event.startsAt).format('ddd DD MMM').toUpperCase()}
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
              push({
                screen: 'tisdagsgolfen.EventResult',
                title: 'Resultat', // title of the screen as appears in the nav bar (optional)
                passProps: { event, userId },
                animated: true,
                backButtonHidden: false
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
            to={`/events/${event.id}/follow`}
            title="FÖLJ LIVE"
            backgroundColor="#f39c12"
            color="white"
          />
          : null
        }
        { event.status !== 'finished'
          ? <LinkButton
            to={`/events/${event.id}/score`}
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

const { shape, string, bool, func } = React.PropTypes

EventCard.propTypes = {
  event: shape({
    id: string.isRequired,
    scoringType: string.isRequired,
    status: string.isRequired,
    teamEvent: bool.isRequired,
    club: string,
    course: string
  }).isRequired,
  push: func.isRequired,
  userId: string.isRequired
}

export default EventCard
