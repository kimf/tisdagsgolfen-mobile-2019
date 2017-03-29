import React, { PropTypes } from 'react'
import { Animated, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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

const AnimatedModal = ({ position, children, height }) => (
  <Animated.View
    style={[
      styles.container,
      {
        height,
        transform: [{ translateY: position }]
      }
    ]}
  >
    {children}
  </Animated.View>
)

AnimatedModal.propTypes = {
  position: PropTypes.shape().isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
}

export default AnimatedModal
