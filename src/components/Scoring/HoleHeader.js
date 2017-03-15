import React, { PropTypes } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'

const HoleHeader = ({ par, number, index }) => (
  <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#222' }}>
    <TGText style={{ textAlign: 'left', color: 'white' }}>
      Par {par}
    </TGText>
    <TGText style={{ textAlign: 'center', color: 'white', flex: 1, fontSize: 24, fontWeight: 'bold' }}>
      {number}
    </TGText>
    <TGText style={{ textAlign: 'right', color: 'white' }}>
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
