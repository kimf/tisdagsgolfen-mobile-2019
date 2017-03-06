import React, { Component } from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  }
})

class LinkButton extends Component {
  handlePress = () => {
    const { history } = this.context
    const { to, replace, preDispatch } = this.props

    if (preDispatch) {
      preDispatch()
    }

    if (replace) {
      history.replace(to)
    } else {
      history.push(to)
    }
  }

  render() {
    const { title, backgroundColor, color, ...rest } = this.props
    return (
      <TouchableHighlight
        {...rest}
        style={[styles.button, { backgroundColor }]}
        onPress={this.handlePress}
        activeOpacity={1}
      >
        <Text style={[styles.text, { color }]}>{title}</Text>
      </TouchableHighlight>
    )
  }
}


LinkButton.contextTypes = {
  history: React.PropTypes.object
}

const { oneOfType, string, shape, bool, func } = React.PropTypes

LinkButton.propTypes = {
  title: string.isRequired,
  to: oneOfType([string, shape()]).isRequired,
  preDispatch: func,
  replace: bool,
  backgroundColor: string,
  color: string
}

LinkButton.defaultProps = {
  backgroundColor: '#ccc',
  color: '#444',
  preDispatch: null,
  replace: false
}

export default LinkButton
