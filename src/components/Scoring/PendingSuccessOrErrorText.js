import React, { PropTypes } from 'react'
import TGText from 'shared/TGText'

const PendingSuccessOrErrorText = ({ scoreItem, item }) => {
  const style = { flex: 1, textAlign: 'center' }
  if (scoreItem.isSaved) {
    return <TGText style={style}>{scoreItem[item]}</TGText>
  }
  if (scoreItem.inFlight) {
    return <TGText style={{ ...style, color: '#ccc' }}>{scoreItem[item]}</TGText>
  }
  if (scoreItem.failedToSave) {
    return <TGText style={{ ...style, color: '#c00' }}>{scoreItem[item]}</TGText>
  }
  return <TGText style={style}>{null}</TGText>
}

PendingSuccessOrErrorText.propTypes = {
  scoreItem: PropTypes.shape({
    isSaved: PropTypes.bool,
    inFlight: PropTypes.bool,
    failedToSave: PropTypes.bool
  }).isRequired,
  item: PropTypes.string.isRequired
}

export default PendingSuccessOrErrorText
