import React, { PropTypes } from 'react'
import TGText from 'shared/TGText'
import { colors } from 'styles'

const ScoreItemText = ({ title, textAlign, fontWeight, fontSize, dimmed }) => {
  const regularColor = fontWeight === 'bold' ? colors.dark : colors.gray
  const color = dimmed ? colors.muted : regularColor
  const style = { flex: 1, textAlign, fontWeight, fontSize, color }
  return <TGText style={style}>{`${title === 0 && dimmed ? '' : title}`}</TGText>
}

ScoreItemText.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  textAlign: PropTypes.string,
  fontWeight: PropTypes.string,
  fontSize: PropTypes.string,
  dimmed: PropTypes.bool
}

ScoreItemText.defaultProps = {
  fontWeight: 'normal',
  fontSize: '22',
  textAlign: 'left',
  dimmed: false
}

export default ScoreItemText
