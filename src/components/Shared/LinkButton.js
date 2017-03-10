import React from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  }
})

const LinkButton = ({ title, backgroundColor, color, onPress, ...rest }) => (
  <TouchableHighlight
    {...rest}
    style={[styles.button, { backgroundColor }]}
    onPress={onPress}
    activeOpacity={1}
  >
    <Text style={[styles.text, { color }]}>{title}</Text>
  </TouchableHighlight>
)

const { string, func } = React.PropTypes

LinkButton.propTypes = {
  title: string.isRequired,
  backgroundColor: string,
  color: string,
  onPress: func.isRequired
}

LinkButton.defaultProps = {
  backgroundColor: '#ccc',
  color: '#444'
}

export default LinkButton
