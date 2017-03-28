import React, { PropTypes } from 'react'
import { Animated, StyleSheet } from 'react-native'

import TGText from 'shared/TGText'
import { colors, deviceWidth } from 'styles'

const styles = StyleSheet.create({
  holeHeader: {
    flexDirection: 'row',
    paddingTop: 40,
    padding: 20,
    backgroundColor: colors.green
  },

  par: {
    textAlign: 'left',
    fontSize: 20,
    lineHeight: 40,
    color: colors.yellow
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
    color: colors.yellow
  }
})

const startingPos = number => (deviceWidth * number) - (deviceWidth + 100)
const middlePoint = number => (deviceWidth * number) - deviceWidth
const stoppingPoint = number => (deviceWidth * number) - (deviceWidth - 100)

const headerOpacity = (scrollX, number) => (
  scrollX.interpolate({
    inputRange: [startingPos(number), middlePoint(number), stoppingPoint(number)],
    outputRange: [0.25, 1, 0.25],
    extrapolate: 'clamp'
  })
)


const HoleHeader = ({ par, number, index, scrollX }) => (
  <Animated.View style={[styles.holeHeader, { opacity: headerOpacity(scrollX, number) }]}>
    <TGText style={styles.par}>
      Par {par}
    </TGText>
    <TGText style={styles.number}>
      {number}
    </TGText>
    <TGText style={styles.index}>
      Hcp {index}
    </TGText>
  </Animated.View>
)

const { number, shape } = PropTypes

HoleHeader.propTypes = {
  par: number.isRequired,
  number: number.isRequired,
  index: number.isRequired,
  scrollX: shape().isRequired
}

export default HoleHeader
