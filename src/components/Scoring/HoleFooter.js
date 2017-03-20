import React, { PropTypes } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'

const styles = { textAlign: 'center', width: '100%', height: '100%', paddingTop: 10, fontSize: 40, color: 'white', fontWeight: 'bold' }

const HoleFooter = ({ number, maxNumber, changeHole }) => (
  <View style={{ flexDirection: 'row', height: 64, backgroundColor: '#999' }}>
    <TGText
      viewStyle={{ flex: 1 }}
      style={styles}
      onPress={() => number > 1 && changeHole(number - 1)}
    >
      {number > 1 ? '<' : null}
    </TGText>
    <TGText
      onPress={() => { }}
      viewStyle={{ flex: 3 }}
      style={{ ...styles, fontSize: 20 }}
    >
      LEDARTAVLA
    </TGText>
    <TGText
      viewStyle={{ flex: 1 }}
      style={styles}
      onPress={() => number < maxNumber && changeHole(number + 1)}
    >
      {number !== maxNumber ? '>' : null}
    </TGText>
  </View >
)

const { number, func } = PropTypes

HoleFooter.propTypes = {
  number: number.isRequired,
  maxNumber: number.isRequired,
  changeHole: func.isRequired
}

export default HoleFooter
