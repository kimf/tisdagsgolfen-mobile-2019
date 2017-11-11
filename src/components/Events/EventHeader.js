import React from 'react'
import { View, StyleSheet } from 'react-native'
import { string, bool } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const gametypeName = (scoringType) => {
  switch (scoringType) {
    case 'modified_points':
      return 'Modifierad Poäng'
    case 'points':
      return 'Poäng'
    default:
      return 'Slag'
  }
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: colors.lightGray,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },

  text: {
    textAlign: 'left',
    flex: 1,
    color: colors.dark,
    fontSize: 14
  }
})

const EventHeader = ({ course, teamEvent, scoringType }) => (
  <View style={styles.view}>
    <TGText style={styles.text}>{course}</TGText>
    <TGText style={[styles.text, { textAlign: 'right' }]}>
      {gametypeName(scoringType)}
      {teamEvent ? ' (Lag)' : null}
    </TGText>
  </View>
)

EventHeader.propTypes = {
  course: string.isRequired,
  teamEvent: bool.isRequired,
  scoringType: string.isRequired
}

export default EventHeader
