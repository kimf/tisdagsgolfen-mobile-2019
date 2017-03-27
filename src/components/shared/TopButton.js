import React, { PropTypes } from 'react'

import TGText from 'shared/TGText'

const TopButton = ({ title, onPress }) => (
  <TGText
    viewStyle={{ backgroundColor: '#ececec', padding: 16, width: '100%', alignSelf: 'flex-end' }}
    style={{ color: '#444', textAlign: 'center', fontWeight: 'bold', fontSize: 12 }}
    onPress={onPress}
  >
    {title}
  </TGText>
)

const { string, func } = PropTypes

TopButton.propTypes = {
  title: string.isRequired,
  onPress: func.isRequired
}

export default TopButton
