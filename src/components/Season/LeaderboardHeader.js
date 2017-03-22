import React, { Component, PropTypes } from 'react'
import { View, Image, Animated, StyleSheet } from 'react-native'

import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'

import { NAVBAR_HEIGHT, STATUS_BAR_HEIGHT } from 'styles'

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    marginBottom: 10,
    height: NAVBAR_HEIGHT,
    zIndex: 1000
  },

  navbarContent: {
    paddingHorizontal: 10,
    flex: 1
  },

  navbarTitle: {
    color: '#000',
    fontWeight: '800',
    fontSize: 30,
    textAlign: 'left'
  },

  navbarInner: {
    backgroundColor: '#fff',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    paddingLeft: STATUS_BAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT * 1.5,
    paddingRight: STATUS_BAR_HEIGHT,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },

  wrapper: {
    height: '100%',
    width: '100%'
  }
})

const { shape, string, func } = PropTypes

const HEADER_SCROLL_DISTANCE = NAVBAR_HEIGHT - 60

class LeaderboardHeader extends Component {
  static propTypes = {
    scrollY: shape(),
    toggleSeasonpicker: func.isRequired,
    currentSeason: string.isRequired,
    gotoEvents: func.isRequired,
    gotoProfile: func.isRequired
  }

  static defaultProps = {
    scrollY: null
  }

  render() {
    const { scrollY, toggleSeasonpicker, currentSeason, gotoEvents, gotoProfile } = this.props


    const navbarTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp'
    })

    const topBarOpacity = scrollY.interpolate({
      inputRange: [0, 40],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    const topBarTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -20],
      extrapolate: 'clamp'
    })

    const titleScale = scrollY.interpolate({
      inputRange: [0, 30, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.7],
      extrapolate: 'clamp'
    })

    const titleX = scrollY.interpolate({
      inputRange: [0, 30, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -40],
      extrapolate: 'clamp'
    })


    return (
      <Animated.View
        style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}
      >
        <Animated.View style={styles.wrapper}>
          <View style={styles.navbarInner}>
            <Animated.View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginBottom: 10,
                opacity: topBarOpacity,
                transform: [{ translateY: topBarTranslate }]
              }}
            >
              <TouchableView
                style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}
                onPress={toggleSeasonpicker}
              >
                <Image style={{ resizeMode: 'contain', height: 12, width: 12, marginRight: 8 }} source={require('../../images/up.png')} />
                <TGText style={{ fontWeight: 'bold', color: '#2ECC71' }}>{currentSeason.name}</TGText>
              </TouchableView>
              <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                <TouchableView onPress={gotoProfile}>
                  <Image style={styles.navbarIcon} source={require('../../images/user.png')} />
                </TouchableView>
                <TouchableView onPress={gotoEvents}>
                  <Image style={[styles.navbarIcon, { marginLeft: 18 }]} source={require('../../images/calendar.png')} />
                </TouchableView>
              </View>
            </Animated.View>
            <Animated.Text
              adjustsFontSizeToFitHeight
              style={[
                styles.navbarTitle,
                {
                  transform: [
                    { scale: titleScale },
                    { translateX: titleX }
                  ]
                }
              ]}
            >
              Ledartavla
            </Animated.Text>
          </View>
        </Animated.View>
      </Animated.View >
    )
  }
}

export default LeaderboardHeader
