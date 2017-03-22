import React, { PropTypes } from 'react'

import TGText from 'shared/TGText'

const BottomButton = ({ title, onPress, backgroundColor, color }) => (
  <TGText
    viewStyle={{ backgroundColor, paddingVertical: 20, width: '100%', alignSelf: 'flex-end' }}
    style={{ color, textAlign: 'center', fontWeight: 'bold', fontSize: 14 }}
    onPress={onPress}
  >
    {title}
  </TGText>
)

const { string, func } = PropTypes

BottomButton.propTypes = {
  title: string.isRequired,
  onPress: func.isRequired,
  backgroundColor: string,
  color: string
}

BottomButton.defaultProps = {
  backgroundColor: '#2ECC71',
  color: '#fff'
}

export default BottomButton
