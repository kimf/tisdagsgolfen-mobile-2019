import React, { Component } from 'react'
import { Animated, Easing } from 'react-native'
import { func, shape, bool } from 'prop-types'
import { compose } from 'react-apollo'
import { NavigationActions } from 'react-navigation'

import HoleView from 'Scoring/HoleView'
import ScoringFooter from 'Scoring/ScoringFooter'
import ScoringMenu from 'Scoring/ScoringMenu'
import ScoringLeaderboard from 'Scoring/ScoringLeaderboard'
import FinishScoringSession from 'Scoring/FinishScoringSession'
import AnimatedModal from 'shared/AnimatedModal'
import Loading from 'shared/Loading'
import styles, { colors, deviceHeight, deviceWidth } from 'styles'
import { withScoringSessionQuery } from 'queries/scoringSessionQuery'
import { withCancelRoundMutation } from 'mutations/cancelRoundMutation'

const MENU_HEIGHT = 300
const LEADERBOARD_HEIGHT = deviceHeight

export class ScoreEvent extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  }

  static propTypes = {
    cancelRound: func.isRequired,
    data: shape({
      loading: bool,
      scoringSession: shape() // TODO: Make into re-usable propType
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

  modal = new Animated.Value(0)
  menu = new Animated.Value(0)
  leaderboard = new Animated.Value(0)
  openModal = null

  changeHole = (nextHole) => {
    this.setState((state) => {
      // eslint-disable-next-line no-underscore-dangle
      this.scrollView._component.scrollTo({
        x: (nextHole * deviceWidth) - deviceWidth,
        animated: false
      })
      this.closeModal('menu')
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
        easing: Easing.inOut(Easing.quad),
        duration: 250
      }
    ).start()
  }

  showModal = (modal) => {
    this.openModal = modal
    Animated.stagger(150, [
      this.animateBackdrop(true),
      this.animateModal(modal, true)
    ])
  }

  closeModal = (modal) => {
    Animated.stagger(150, [
      this.animateModal(modal, false),
      this.animateBackdrop(false)
    ])
  }

  cancelRound = () => {
    const { data, cancelRound, navigation } = this.props

    const save = async () => {
      try {
        await cancelRound(data.scoringSession.id)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Main' })
        ]
      })
      navigation.dispatch(resetAction)
    }
    save()
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
            <FinishScoringSession
              playing={playing}
              scoringSession={scoringSession}
              scrollX={scrollX}
            />
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
          <ScoringMenu
            onClose={() => this.closeModal('menu')}
            cancelRound={this.cancelRound}
            holes={scoringSession.course.holes}
            currentHole={currentHole}
            changeHole={this.changeHole}
          />
        </AnimatedModal>

        <AnimatedModal height={LEADERBOARD_HEIGHT} position={leaderboardPosition}>
          <ScoringLeaderboard
            onClose={() => this.closeModal('leaderboard')}
            scoringType={scoringSession.event.scoringType}
            eventId={scoringSession.event.id}
            teamEvent={scoringSession.event.teamEvent}
          />
        </AnimatedModal>
      </Animated.View>
    )
  }
}

export default compose(
  withScoringSessionQuery,
  withCancelRoundMutation
)(ScoreEvent)
