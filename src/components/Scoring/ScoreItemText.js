import React from 'react'
import { oneOfType, string, number, bool } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const ScoreItemText = ({ title, textAlign, fontWeight, fontSize, dimmed }) => {
  const regularColor = fontWeight === 'bold' ? colors.dark : colors.gray
  const color = dimmed ? colors.muted : regularColor
  const style = {
    flex: 1,
    textAlign,
    fontWeight,
    fontSize,
    color
  }
  return <TGText style={style}>{`${title === 0 && dimmed ? '' : title}`}</TGText>
}

ScoreItemText.propTypes = {
  title: oneOfType([string, number]).isRequired,
  textAlign: string,
  fontWeight: string,
  fontSize: string,
  dimmed: bool
}

ScoreItemText.defaultProps = {
  fontWeight: 'normal',
  fontSize: '26',
  textAlign: 'center',
  dimmed: false
}

export default ScoreItemText
