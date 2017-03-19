import React, { PropTypes } from 'react'
import TGText from 'shared/TGText'

const ScoreItemText = ({ title, textAlign, fontWeight, fontSize, dimmed }) => {
  const regularColor = fontWeight === 'bold' ? '#000' : '#555'
  const color = dimmed ? '#ccc' : regularColor
  const style = { flex: 1, textAlign, fontWeight, fontSize, color }
  return <TGText style={style}>{`${title === 0 && dimmed ? '' : title}`}</TGText>
}

ScoreItemText.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  textAlign: PropTypes.string,
  fontWeight: PropTypes.string,
  fontSize: PropTypes.string,
  dimmed: PropTypes.bool
}

ScoreItemText.defaultProps = {
  fontWeight: 'normal',
  fontSize: '24',
  textAlign: 'left',
  dimmed: false
}

export default ScoreItemText
