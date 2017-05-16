import React from 'react'
import { Alert, View, StyleSheet } from 'react-native'
import { func } from 'prop-types'

import TGText from 'shared/TGText'
import TopButton from 'shared/TopButton'
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

const confirmCancel = (cancelFunc) => {
  Alert.alert(
    'Vill du verkligen avsluta rundan?',
    'Allt du matat in kommer raderas!',
    [
      { text: 'Cancel', onPress: () => null, style: 'cancel' },
      { text: 'OK', onPress: () => cancelFunc() }
    ],
    { cancelable: false }
  )
}


const ScoringMenu = ({ onClose, cancelRound }) => (
  <View style={{ flex: 1 }}>
    <View style={styles.inner}>
      <TGText style={styles.text}>
        Här kommer fler val sen
      </TGText>
      <TGText
        style={{ color: colors.red, textAlign: 'center' }}
        onPress={() => confirmCancel(cancelRound)}
      >
        AVSLUTA RUNDA
      </TGText>
    </View>
    <TopButton
      backgroundColor={colors.blue}
      title="STÄNG"
      onPress={() => onClose()}
    />
  </View>
)

ScoringMenu.propTypes = {
  onClose: func.isRequired,
  cancelRound: func.isRequired
}

export default ScoringMenu
