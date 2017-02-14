import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import moment from 'moment'
import 'moment/locale/sv'
import colors from '../../../colors'

const s = StyleSheet.create({
  /* EVENT CARDS */
  eventCard: {
    top: 10,
    flexDirection: 'column',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 2,
    borderColor: colors.cellBorder,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
    shadowColor: '#999',
    shadowOffset: { width: 2, height: 8 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    borderLeftWidth: StyleSheet.hairlineWidth * 5
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
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  gametype: {
    fontSize: 12,
    paddingVertical: 7,
    color: '#777'
  },

  finished: {
    borderLeftColor: 'green'
  },

  planned: {
    borderLeftColor: 'orange'
  }
})

const EventCard = ({ event, gotoEvent }) => {
  let gametypeName = ''
  if (event.scoringType === 'modified_points') {
    gametypeName = 'Modifierad Poäng'
  } else if (event.scoringType === 'points') {
    gametypeName = 'Poäng'
  } else {
    gametypeName = 'Slag'
  }

  return (
    <TouchableOpacity onPress={() => gotoEvent(event.id)}>
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
    </TouchableOpacity>
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
  gotoEvent: func.isRequired
}

export default EventCard
