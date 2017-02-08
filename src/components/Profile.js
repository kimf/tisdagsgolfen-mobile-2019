import React from 'react'
import { View, TouchableHighlight, Modal, Text } from 'react-native'
import styles from '../styles';

const Profile = ({visible, player, onLogout, onClose}) => {
  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={visible}
      hardwareAccelerated
    >
     <View style={[{marginTop: 22}, styles.innerContainer]}>
      <View style={{flex: 1}}>
        <Text>Hej {player.firstName}</Text>
        <TouchableHighlight onPress={() => {onClose()}}>
          <Text style={styles.btn}>TILLBAKA</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => {onLogout()}}>
          <Text style={styles.btn}>LOGGA UT</Text>
        </TouchableHighlight>
      </View>
     </View>
    </Modal>
  )
}

export default Profile
