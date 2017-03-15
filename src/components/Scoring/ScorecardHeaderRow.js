import React, { PropTypes } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'

const ScorecardHeaderRow = ({ teamEvent }) => {
  const puttsHeader = teamEvent ? null : (
    <TGText style={{ flex: 1, textAlign: 'center' }}>PUTTAR</TGText>
  )
  return (
    <View style={{ paddingVertical: 15, paddingHorizontal: 10, flexDirection: 'row', backgroundColor: '#eee' }}>
      <TGText style={{ flex: 2 }}>SPELARE</TGText>
      <TGText style={{ flex: 1, textAlign: 'center' }}>SLAG</TGText>
      {puttsHeader}
      <TGText style={{ flex: 1, textAlign: 'center' }}>POÄNG</TGText>
    </View>
  )
}

ScorecardHeaderRow.propTypes = {
  teamEvent: PropTypes.bool.isRequired
}

export default ScorecardHeaderRow
