import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Dimensions,
  View
} from 'react-native'

import spinner from '../../images/loading.gif'

const DEVICE_WIDTH = Dimensions.get('window').width
const MARGIN = 40

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E98DF',
    height: MARGIN,
    zIndex: 100
  },
  text: {
    color: 'white',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  image: {
    width: 24,
    height: 24
  }
})

class ButtonSubmit extends Component {
  constructor() {
    super()

    this.state = { isLoading: false }

    this.buttonAnimated = new Animated.Value(0)
  }

  onPress = () => {
    if (this.state.isLoading) return

    this.setState({ isLoading: true })
    Animated.timing(
      this.buttonAnimated,
      {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      }
    ).start()

    setTimeout(() => {
      this.props.onPress()
      this.setState({ isLoading: false })
      this.buttonAnimated.setValue(0)
    }, 1500)
  }

  _onGrow() {
    Animated.timing(
      this.growAnimated,
      {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      }
    ).start()
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
    })

    return (
      <View style={styles.container}>
        <Animated.View style={{ width: changeWidth }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.onPress}
            activeOpacity={1}
          >
            { this.state.isLoading
              ? <Image source={spinner} style={styles.image} />
              : <Text style={styles.text}>LOGGA IN</Text>
            }
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}

ButtonSubmit.propTypes = {
  onPress: React.PropTypes.func.isRequired
}


export default ButtonSubmit
