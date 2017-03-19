import React, { PropTypes } from 'react'
import { View, StatusBar } from 'react-native'
import TGText from 'shared/TGText'

const NavigationBar = ({ title }) => (
  <View
    style={{
      height: 64,
      backgroundColor: '#2ECC71',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <StatusBar barStyle="light-content" />
    <TGText style={{ paddingTop: 10, color: 'white', fontWeight: 'bold' }}>{title}</TGText>
  </View>
)

NavigationBar.propTypes = {
  title: PropTypes.string
}

NavigationBar.defaultProps = {
  title: 'TITLE'
}

export default NavigationBar
