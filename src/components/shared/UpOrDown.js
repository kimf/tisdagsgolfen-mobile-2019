import React from 'react'
import { number } from 'prop-types'

import TGText from './TGText'
import { colors } from '../../styles'

const UpOrDown = ({ prev, current }) => {
  if (current < prev) {
    return <TGText style={{ fontSize: 12, flex: 1, color: colors.green }}>↥{prev - current}</TGText>
  }

  return <TGText style={{ fontSize: 12, flex: 1, color: colors.red }}>↧{current - prev}</TGText>
}

UpOrDown.propTypes = {
  prev: number.isRequired,
  current: number.isRequired
}

export default UpOrDown
