import React from 'react'
import { View, TouchableHighlight, Text, Modal } from 'react-native'
import { Link } from 'react-router-native'
import styles from '../styles';

const Profile = ({user, onLogout, onClose}) => {
  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible
      hardwareAccelerated
    >
      <View style={[{marginTop: 22}, styles.innerContainer]}>
        <View style={{flex: 1}}>
          <Text>Hej {user.firstName}</Text>
          <Link pop to='/' style={styles.btn}><Text>Tillbaka</Text></Link>

          <TouchableHighlight onPress={() => {onLogout()}}>
            <Text style={styles.btn}>LOGGA UT</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

export default Profile
