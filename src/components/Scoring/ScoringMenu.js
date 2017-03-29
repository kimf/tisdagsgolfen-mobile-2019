import React, { PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'

import TGText from 'shared/TGText'
import BottomButton from 'shared/BottomButton'
import { colors } from 'styles'

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    paddingTop: 40
  },
  text: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 20
  }
})

const ScoringMenu = ({ onClose }) => (
  <View style={{ flex: 1 }}>
    <View style={styles.inner}>
      <TGText style={styles.text}>
        Här kommer text sen
      </TGText>
    </View>
    <BottomButton
      backgroundColor={colors.red}
      title="AVSLUTA RUNDA"
      onPress={() => onClose()}
    />
  </View>
)

ScoringMenu.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default ScoringMenu
