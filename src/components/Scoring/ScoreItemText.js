import React, { PropTypes } from 'react'
import TGText from 'shared/TGText'

const ScoreItemText = ({ title, fontWeight, fontSize }) => {
  const style = { flex: 1, textAlign: 'center', fontWeight, fontSize }
  return <TGText style={style}>{`${title}`}</TGText>
}

ScoreItemText.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  fontWeight: PropTypes.string,
  fontSize: PropTypes.string
}

ScoreItemText.defaultProps = {
  fontWeight: 'normal',
  fontSize: '30'
}

export default ScoreItemText
