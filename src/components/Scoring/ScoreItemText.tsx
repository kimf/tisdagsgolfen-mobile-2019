import React from 'react'
import { colors } from '../../styles'
import TGText from '../shared/TGText'
interface ScoreItemTextProps {
  title: any | any
  textAlign?: any
  fontWeight?: any
  fontSize?: any
  dimmed?: any
}
const ScoreItemText: React.SFC<ScoreItemTextProps> = ({
  title,
  textAlign,
  fontWeight,
  fontSize,
  dimmed
}) => {
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

export default ScoreItemText
