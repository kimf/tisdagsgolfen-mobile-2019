import React, { Component } from 'react'
import { Animated, Easing } from 'react-native'
import { shape, bool } from 'prop-types'

import HoleView from 'Scoring/HoleView'
import ScoringFooter from 'Scoring/ScoringFooter'
import ScoringMenu from 'Scoring/ScoringMenu'
import ScoringLeaderboard from 'Scoring/ScoringLeaderboard'
import AnimatedModal from 'shared/AnimatedModal'
import Loading from 'shared/Loading'
import styles, { colors, deviceHeight, deviceWidth } from 'styles'
import { withScoringSessionQuery } from 'queries/scoringSessionQuery'

const MENU_HEIGHT = 300
const LEADERBOARD_HEIGHT = deviceHeight - 100

export class ScoreEvent extends Component {
  static navigationOptions = {
    header: false,
    tabBar: false,
    cardStack: { gesturesEnabled: false }
  }

  static propTypes = {
    data: shape({
      loading: bool,
      scoringSession: shape()
    }),
    navigation: shape().isRequired
  }

  static defaultProps = {
    data: {
      loading: true,
      scoringSession: null
    }
  }

  static scrollView = null
  static inSwipeArea = false
  static closingState = null

  constructor() {
    super()

    this.state = {
      currentHole: 1,
      scrollEnabled: true,
      scrollX: new Animated.Value(0)
    }
  }

  onCancel = () => {
    // await this.props.onCancelEvent()
    this.props.navigation.goBack()
  }

  modal = new Animated.Value(0)
  menu = new Animated.Value(0)
  leaderboard = new Animated.Value(0)
  openModal = null

  changeHole = (nextHole) => {
    this.setState((state) => {
      this.scrollView.scrollTo({ x: (nextHole * deviceWidth) - deviceWidth, animated: true })
      return { ...state, currentHole: nextHole }
    })
  }

  animateBackdrop = (open) => {
    Animated.timing(
      this.modal,
      {
        toValue: open ? 1 : 0,
        easing: Easing.inOut(Easing.quad)
      },
     ).start()
  }

  animateModal = (modal, open) => {
    let toValue = 0
    let animVal = null
    const openModal = modal || this.openModal

    if (openModal === 'leaderboard') {
      toValue = open ? LEADERBOARD_HEIGHT : 0
      animVal = this.leaderboard
    } else {
      toValue = open ? MENU_HEIGHT : 0
      animVal = this.menu
    }

    Animated.timing(
      animVal,
      {
        toValue,
        easing: Easing.inOut(Easing.quad)
      }
    ).start()
  }

  showModal = (modal) => {
    this.openModal = modal
    Animated.stagger(500, [
      this.animateBackdrop(true),
      this.animateModal(modal, true)
    ])
  }

  closeModal = (modal) => {
    Animated.stagger(350, [
      this.animateModal(modal, false),
      this.animateBackdrop(false)
    ])
  }

  handlePageChange = (e) => {
    const offset = e.nativeEvent.contentOffset
    if (offset) {
      const page = Math.round(offset.x / deviceWidth) + 1
      if (this.state.currentHole !== page) {
        this.setState(state => ({ ...state, currentHole: page }))
      }
    }
  }

  render() {
    const { data } = this.props
    const { currentHole, scrollEnabled, scrollX } = this.state
    if (data.loading) {
      return <Loading text="Laddar hål och sånt..." />
    }

    const scoringSession = data.scoringSession
    const teamEvent = scoringSession.event.teamEvent

    const playing = teamEvent ? scoringSession.scoringTeams : scoringSession.scoringPlayers

    const transformScale = this.modal.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.95],
      extrapolate: 'clamp'
    })

    const menuPosition = this.menu.interpolate({
      inputRange: [0, MENU_HEIGHT],
      outputRange: [MENU_HEIGHT, 0],
      extrapolate: 'clamp'
    })

    const leaderboardPosition = this.leaderboard.interpolate({
      inputRange: [0, LEADERBOARD_HEIGHT],
      outputRange: [LEADERBOARD_HEIGHT, 0],
      extrapolate: 'clamp'
    })

    const tapSuprresorPosition = this.modal.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -deviceHeight],
      extrapolate: 'clamp'
    })

    return (
      <Animated.View
        style={{
          flex: 1,
          height: '100%',
          alignItems: 'stretch',
          backgroundColor: colors.green
        }}
      >
        <Animated.View
          style={{ height: deviceHeight - 48, transform: [{ scale: transformScale }] }}
        >
          <Animated.ScrollView
            style={{ width: '100%', height: '100%' }}
            ref={(sv) => { this.scrollView = sv }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={scrollEnabled}
            onMomentumScrollEnd={this.handlePageChange}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
              { useNativeDriver: true }
            )}
            horizontal
            paging
            bounces
            pagingEnabled
            removeClippedSubviews
          >
            {scoringSession.course.holes.map(h => (
              <HoleView
                key={`hole_view_${h.id}`}
                hole={h}
                isActive={h.number === currentHole}
                playing={playing}
                holesCount={scoringSession.course.holes.length}
                event={scoringSession.event}
                scrollX={scrollX}
                scoringSessionId={scoringSession.id}
              />
            ))}
          </Animated.ScrollView>
        </Animated.View>

        <ScoringFooter
          number={currentHole}
          maxNumber={scoringSession.course.holes.length}
          showMenu={() => this.showModal('menu')}
          showLeaderboard={() => this.showModal('leaderboard')}
        />

        <Animated.View
          pointerEvents="none"
          style={[
            styles.backdrop,
            { opacity: this.modal }
          ]}
        />

        <Animated.View
          onStartShouldSetResponder={() => this.closeModal()}
          style={{ backgroundColor: 'transparent', height: deviceHeight, width: '100%', transform: [{ translateY: tapSuprresorPosition }] }}
        />

        <AnimatedModal height={MENU_HEIGHT} position={menuPosition}>
          <ScoringMenu onClose={() => this.closeModal('menu')} />
        </AnimatedModal>

        <AnimatedModal height={LEADERBOARD_HEIGHT} position={leaderboardPosition} >
          <ScoringLeaderboard onClose={() => this.closeModal('leaderboard')} />
        </AnimatedModal>
      </Animated.View>
    )
  }
}

export default withScoringSessionQuery(ScoreEvent)
