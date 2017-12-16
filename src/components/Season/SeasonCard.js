import React from 'react'
import { View, ImageBackground } from 'react-native'
import { func, string } from 'prop-types'

import TouchableView from 'shared/TouchableView'
import TGText from 'shared/TGText'
import { colors } from 'styles'
import trophyImg from 'images/trophy-filled.png'

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
  <TGText
    style={{
      padding: 10,
      textShadowColor: colors.dark,
      textShadowOffset: { width: 2, height: 2 },
      backgroundColor: 'transparent',
      color: colors.white,
      fontSize: 24
    }}>
    {name}
  </TGText>
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
    {photo && (
      <ImageBackground
        onPress={onPress}
        style={cardStyle}
        source={photo ? { uri: photo } : trophyImg}
        resizeMode="cover">
        <Name name={name} />
      </ImageBackground>
    )}
    {!photo && (
      <View style={cardStyle}>
        <Name name={name} />
      </View>
    )}
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
