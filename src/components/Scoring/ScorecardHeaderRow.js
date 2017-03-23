import React, { PropTypes } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'

const style = { paddingVertical: 10, flex: 1, textAlign: 'left', fontSize: 12 }

const ScorecardHeaderRow = ({ teamEvent, scoring }) => {
  const puttsHeader = teamEvent ? null : (
    <TGText style={style}>PUTT</TGText>
  )
  const beersHeader = teamEvent ? null : (
    <TGText style={style}>ÖL</TGText>
  )
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#ccc',
        paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
      }}
    >
      <TGText style={{ ...style, flex: 2 }}>SPELARE</TGText>
      {beersHeader}
      <TGText style={style}>SLAG</TGText>
      {puttsHeader}
      {scoring ? null : <TGText style={{ ...style, textAlign: 'center' }}>POÄNG</TGText>}
    </View>
  )
}

ScorecardHeaderRow.propTypes = {
  teamEvent: PropTypes.bool.isRequired,
  scoring: PropTypes.bool.isRequired
}

export default ScorecardHeaderRow
