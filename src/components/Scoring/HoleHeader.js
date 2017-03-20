import React, { PropTypes } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const HoleHeader = ({ par, number, index }) => (
  <View style={{ flexDirection: 'row', paddingTop: 42, padding: 20, backgroundColor: colors.green }}>
    <TGText style={{ textAlign: 'left', fontSize: 20, lineHeight: 40, color: 'white' }}>
      Par {par}
    </TGText>
    <TGText style={{ textAlign: 'center', color: 'white', flex: 1, fontSize: 40, lineHeight: 40, fontWeight: 'bold' }}>
      {number}
    </TGText>
    <TGText style={{ textAlign: 'right', fontSize: 20, lineHeight: 40, color: 'white' }}>
      Index: {index}
    </TGText>
  </View>
)

const number = PropTypes.number

HoleHeader.propTypes = {
  par: number.isRequired,
  number: number.isRequired,
  index: number.isRequired
}

export default HoleHeader
