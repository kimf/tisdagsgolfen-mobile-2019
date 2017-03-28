import React, { Component, PropTypes } from 'react'
import { Animated, Easing, View, StyleSheet } from 'react-native'

import TGText from 'shared/TGText'
import BottomButton from 'shared/BottomButton'
import { colors } from 'styles'

const MODAL_HEIGHT = 300

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  },

  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)'
  },

  container: {
    backgroundColor: '#fff',
    flex: 1,
    height: MODAL_HEIGHT,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0
  },
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

class ScoringMenu extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired
  }

  state = { animated: new Animated.Value(0) }

  componentDidMount() {
    Animated.timing(
      this.state.animated,
      {
        toValue: 1,
        easing: Easing.inOut(Easing.quad)
      },
     ).start()
  }

  close = () => this.props.onClose()
  /* Animated.timing(
    this.state.animated,
    {
      toValue: 0,
      easing: Easing.out,
      duration: 10000
    },
  ).start() */

  render() {
    const animated = this.state.animated

    const position = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [MODAL_HEIGHT, 0],
      extrapolate: 'clamp'
    })


    return (
      <View style={styles.wrapper}>
        <Animated.View
          onStartShouldSetResponder={this.close}
          style={[
            styles.backdrop,
            { opacity: animated }
          ]}
        />
        <Animated.View
          style={[
            styles.container,
            { transform: [{ translateY: position }] }
          ]}
        >
          <View style={styles.inner}>
            <TGText style={styles.text}>
              Här kommer text sen
            </TGText>
          </View>
          <BottomButton
            backgroundColor={colors.red}
            title="AVSLUTA RUNDA"
            onPress={() => { }}
          />
        </Animated.View>
      </View>
    )
  }
}

export default ScoringMenu
