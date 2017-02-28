import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'
import moment from 'moment'
import 'moment/locale/sv'

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
    borderLeftWidth: 2,
    elevation: 5
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 5
  },

  date: {
    color: '#000',
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 5,
    marginBottom: 5
  },

  gametype: {
    fontSize: 12,
    paddingVertical: 7,
    color: '#777'
  },

  finished: {
    borderLeftColor: '#008000'
  },

  planned: {
    borderLeftColor: '#FFA500'
  }
})

const EventCard = ({ event }) => {
  let gametypeName = ''
  if (event.scoringType === 'modified_points') {
    gametypeName = 'Modifierad Poäng'
  } else if (event.scoringType === 'points') {
    gametypeName = 'Poäng'
  } else {
    gametypeName = 'Slag'
  }

  return (
    <Link to={`/events/${event.id}`}>
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
          <Text style={{ fontSize: 16, lineHeight: 25 }}>{event.club}</Text>
          <Text style={{ fontSize: 16, lineHeight: 25 }}>{event.course}</Text>
        </View>
      </View>
    </Link>
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
  }).isRequired
}

export default EventCard
