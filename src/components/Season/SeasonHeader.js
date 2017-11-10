import React from 'react'
import { View, Image } from 'react-native'
import { func } from 'prop-types'

import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'

import { seasonShape } from 'propTypes'
import styles, { colors } from 'styles'

const SeasonHeader = ({ season, togglePicker }) => (
  <View style={[styles.navbar, { backgroundColor: colors.lightGray }]}>
    <View style={[styles.navbarInner, { backgroundColor: colors.lightGray }]}>
      <TouchableView
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 20,
          paddingLeft: 0,
          flex: 0,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'row'
        }}
        onPress={togglePicker}
      >
        <Image
          style={{
            tintColor: colors.muted,
            resizeMode: 'contain',
            height: 12,
            width: 12,
            marginRight: 8
          }}
          source={require('../../images/left.png')}
        />
      </TouchableView>
      <TGText
        adjustsFontSizeToFitHeight
        style={[styles.navbarTitle, { color: colors.dark, fontSize: 20 }]}
      >
        Tisdagsgolfen {season.name}
      </TGText>
    </View>
  </View>
)

SeasonHeader.propTypes = {
  season: seasonShape.isRequired,
  togglePicker: func.isRequired
}

export default SeasonHeader
