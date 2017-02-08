import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, Linking} from "react-native";

import moment from 'moment';
import sv from 'moment/locale/sv';
import colors from '../colors';

class EventCard extends Component {
  _seeLeaderboard = (eventId) => {
    Linking.openURL(`https://www.simplegolftour.com/tours/1/events/${eventId}`);
  }

  render() {
    const { event } = this.props;

    let scoringBtn;

    if (event.status !== 'finished') {
      scoringBtn = (
        <TouchableOpacity
          onPress={() => setupEvent(event)}
          style={s.scoreBtn}>
          <Text style={[s.eventCardBtn, {color: '#fff'}]}>SCORA</Text>
        </TouchableOpacity>
      )
    }

    let resultsBtn;
    if(event.status === 'finished') {
      resultsBtn = (
        <TouchableOpacity
          onPress={() => this._seeLeaderboard(event.oldId)}
          style={s.followBtn}
        >
          <Text style={[s.eventCardBtn, {color: '#777'}]}>SE RESULTAT</Text>
        </TouchableOpacity>
      )
    } else if(event.is_scoring) {
      resultsBtn = (
        <TouchableOpacity
          onPress={() => followEvent(event)}
          style={s.followBtn}
        >
          <Text style={[s.eventCardBtn, {color: '#777'}]}>FÖLJ LIVE</Text>
        </TouchableOpacity>
      )
    }

    let gametypeName = '';
    if(event.scoringType === 'modified_points') {
      gametypeName = 'Modifierad Poäng';
    } else if(event.scoringType === 'points') {
      gametypeName = 'Poäng';
    } else {
      gametypeName = 'Slag';
    }

    return (
      <View style={[s.eventCard]}>
        <View style={s.row}>
          <Text style={[s.date]}>
            {moment(event.startsAt).format('ddd D MMM HH:mm').toUpperCase()}
          </Text>

          <Text style={s.gametype}>
            {event.teamEvent ? 'Lag' : 'Individuellt'}
            {` ↝ `}
            {gametypeName}
          </Text>
        </View>

        <View style={s.row}>
          <Text style={{fontSize: 16, lineHeight: 25}}>{event.club}</Text>
          <Text style={{fontSize: 16, lineHeight: 25}}>{event.course}</Text>
        </View>

        {scoringBtn}
        {resultsBtn}
      </View>
    );
  }
}

const s = StyleSheet.create({
  /* EVENT CARDS */
  eventCard: {
    flexDirection: 'column',
    margin: 10,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 2,
    borderColor: colors.cellBorder,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: { width: 4, height: 4},
    shadowRadius: 4,
    shadowOpacity: 0.2
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10
  },

  buttonRow: {
    marginTop: 10,
  },

  date: {
    color: '#000',
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  gametype: {
    fontSize: 10,
    padding: 5,
    paddingTop: 10,
    color: '#777',
  },

  eventCardBtn: {
    textAlign: 'center',
    padding: 5,
  },

  scoreBtn: {
    backgroundColor: '#ccc',
  },

  scoringBtn: {
    backgroundColor: 'green',
  },

  followBtn: {
    backgroundColor: '#feb',
  }
})


export default EventCard;
