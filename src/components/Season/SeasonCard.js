import React from 'react'
import { View, Text } from 'react-native'
import { func, string } from 'prop-types'

import TouchableView from '../shared/TouchableView'
import { colors } from '../../styles'

const cardStyle = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  width: '100%',
  height: '100%',
  backgroundColor: colors.semiDark
}

const Name = ({ name }) => (
  <Text
    style={{
      padding: 10,
      textShadowColor: colors.dark,
      textShadowOffset: { width: 2, height: 2 },
      backgroundColor: 'transparent',
      color: colors.white,
      fontSize: 24
    }}>
    {name}
  </Text>
)

Name.propTypes = {
  name: string.isRequired
}

const SeasonCard = ({ onPress, photo, name }) => (
  <TouchableView
    onPress={onPress}
    style={{
      flex: 1,
      marginBottom: 10
    }}>
    <View style={cardStyle}>
      <Name name={name} />
    </View>
  </TouchableView>
)

SeasonCard.propTypes = {
  onPress: func.isRequired,
  name: string.isRequired,
  photo: string
}

SeasonCard.defaultProps = {
  photo: null
}

export default SeasonCard
