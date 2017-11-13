import React from 'react'
import { View, StyleSheet, Animated, Image } from 'react-native'
import { string, bool, shape, func } from 'prop-types'

import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'
import { colors } from 'styles'

const gametypeName = (scoringType) => {
  switch (scoringType) {
    case 'modified_points':
      return 'Modifierad Poäng'
    case 'points':
      return 'Poäng'
    default:
      return 'Slaggolf'
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 10,
    height: 60,
    backgroundColor: colors.lightGray,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },

  text: {
    textAlign: 'left',
    flex: 1,
    color: colors.semiDark,
    fontWeight: 'bold',
    fontSize: 12,
    height: 20
  }
})

const EventHeader = ({
  course, teamEvent, scoringType, toggle, imageSpin
}) => (
  <TouchableView style={styles.view} onPress={toggle}>
    <View style={{ flex: 1 }}>
      <TGText style={[styles.text, { color: colors.darkGreen, fontSize: 16 }]}>{course}</TGText>
      <TGText style={styles.text}>
        {gametypeName(scoringType)}
        {teamEvent ? ', Lagtävling ' : ', Individuellt'}
      </TGText>
    </View>
    {imageSpin && (
      <View
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end'
        }}
      >
        <Animated.Image
          style={{
            tintColor: colors.dark,
            resizeMode: 'contain',
            height: 18,
            width: 18,
            marginLeft: 5,
            transform: [{ rotate: imageSpin }]
          }}
          source={require('../../images/slide-up.png')}
        />
      </View>
    )}
  </TouchableView>
)

EventHeader.propTypes = {
  course: string.isRequired,
  teamEvent: bool.isRequired,
  scoringType: string.isRequired,
  toggle: func.isRequired,
  imageSpin: shape()
}

EventHeader.defaultProps = {
  imageSpin: null
}

export default EventHeader
