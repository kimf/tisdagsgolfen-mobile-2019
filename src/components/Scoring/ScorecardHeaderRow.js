import React, { PropTypes } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'

const ScorecardHeaderRow = ({ teamEvent }) => {
  const puttsHeader = teamEvent ? null : (
    <TGText style={{ flex: 1, textAlign: 'center' }}>PUTTAR</TGText>
  )
  const beersHeader = teamEvent ? null : (
    <TGText style={{ flex: 1, textAlign: 'center' }}>ÖL</TGText>
  )
  return (
    <View style={{ paddingVertical: 15, paddingHorizontal: 10, flexDirection: 'row', backgroundColor: '#eee' }}>
      <TGText style={{ flex: 2 }}>SPELARE</TGText>
      {beersHeader}
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
