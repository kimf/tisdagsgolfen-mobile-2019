import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import { number as numPropType, shape } from 'prop-types'

import TGText from '../shared/TGText'
import { colors, deviceWidth } from '../../styles'

const styles = StyleSheet.create({
  holeHeader: {
    flexDirection: 'row',
    paddingTop: 40,
    padding: 20,
    backgroundColor: colors.blue
  },

  par: {
    textAlign: 'left',
    fontSize: 20,
    lineHeight: 40,
    color: colors.lightGray
  },

  number: {
    textAlign: 'center',
    color: colors.white,
    flex: 1,
    fontSize: 50,
    lineHeight: 55,
    fontWeight: 'bold'
  },

  index: {
    textAlign: 'right',
    fontSize: 20,
    lineHeight: 40,
    color: colors.lightGray
  }
})

const startingPos = num => deviceWidth * num - (deviceWidth + 100)
const middlePoint = num => deviceWidth * num - deviceWidth
const stoppingPoint = num => deviceWidth * num - (deviceWidth - 100)

const headerOpacity = (scrollX, num) =>
  scrollX.interpolate({
    inputRange: [startingPos(num), middlePoint(num), stoppingPoint(num)],
    outputRange: [0.25, 1, 0.25],
    extrapolate: 'clamp'
  })

const HoleHeader = ({ par, number, index, scrollX }) => (
  <Animated.View style={[styles.holeHeader, { opacity: headerOpacity(scrollX, number) }]}>
    <TGText style={styles.par}>Par {par}</TGText>
    <TGText style={styles.number}>{number}</TGText>
    <TGText style={styles.index}>Hcp {index}</TGText>
  </Animated.View>
)

HoleHeader.propTypes = {
  par: numPropType.isRequired,
  number: numPropType.isRequired,
  index: numPropType.isRequired,
  scrollX: shape().isRequired
}

export default HoleHeader
