import React, { Component } from 'react'
import { Animated, Easing } from 'react-native'
import { compose } from 'react-apollo'
import { NavigationActions, StackActions } from 'react-navigation'

import HoleView from '../components/Scoring/HoleView'
import ScoringFooter from '../components/Scoring/ScoringFooter'
import ScoringMenu from '../components/Scoring/ScoringMenu'
import ScoringLeaderboard from '../components/Scoring/ScoringLeaderboard'
import FinishScoringSession from '../components/Scoring/FinishScoringSession'
import AnimatedModal from '../components/shared/AnimatedModal'
import Loading from '../components/shared/Loading'
import styles, { colors, deviceHeight, deviceWidth } from '../styles'
import { withScoringSessionQuery } from '../graph/queries/scoringSessionQuery'
import { withCancelRoundMutation } from '../graph/mutations/cancelRoundMutation'
import { withFinishRoundMutation } from '../graph/mutations/finishRoundMutation'
import { screenPropsShape } from '../_propTypes'

const MENU_HEIGHT = 300
const LEADERBOARD_HEIGHT = deviceHeight

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Season' })]
})

// TODO: Break this big ass component apart!
export class ScoreEvent extends Component {
  public static navigationOptions = {
    header: null,
    tabBarVisible: false
  }

  public static propTypes = {
    screenProps: screenPropsShape.isRequired,
    cancelRound: func.isRequired,
    finishRound: func.isRequired,
    data: shape({
      loading: bool,
      scoringSession: shape() // TODO: Make into re-usable propType
    }).isRequired,
    navigation: shape().isRequired
  }

  public static scrollView = null
  public static inSwipeArea = false
  public static closingState = null

  public modal = new Animated.Value(0)
  public menu = new Animated.Value(0)
  public leaderboard = new Animated.Value(0)
  public openModal = null

  constructor() {
    super()

    this.state = {
      currentHole: 1,
      scrollEnabled: true,
      scrollX: new Animated.Value(0)
    }
  }

  public changeHole = nextHole => {
    console.log(nextHole)
    this.setState(state => {
      // eslint-disable-next-line no-underscore-dangle
      this.scrollView._component.scrollTo({
        x: nextHole * (deviceWidth - deviceWidth),
        animated: false
      })
      this.closeModal('menu')
      return { ...state, currentHole: nextHole }
    })
  }

  public animateBackdrop = open => {
    Animated.timing(this.modal, {
      toValue: open ? 1 : 0,
      easing: Easing.inOut(Easing.quad)
    }).start()
  }

  public animateModal = (modal, open) => {
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

    Animated.timing(animVal, {
      toValue,
      easing: Easing.inOut(Easing.quad),
      duration: 250
    }).start()
  }

  public showModal = modal => {
    this.openModal = modal
    Animated.stagger(150, [this.animateBackdrop(true), this.animateModal(modal, true)])
  }

  public closeModal = modal => {
    Animated.stagger(150, [this.animateModal(modal, false), this.animateBackdrop(false)])
  }

  public cancelRound = () => {
    const { data, cancelRound, navigation } = this.props

    const save = async () => {
      try {
        await cancelRound(data.scoringSession.id)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
      navigation.dispatch(resetAction)
    }
    save()
  }

  public finishRound = () => {
    const { data, finishRound, navigation } = this.props

    const save = async () => {
      try {
        await finishRound(data.scoringSession.id)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
      navigation.dispatch(resetAction)
    }
    save()
  }

  public handlePageChange = e => {
    const offset = e.nativeEvent.contentOffset
    if (offset) {
      const page = Math.round(offset.x / deviceWidth) + 1
      if (this.state.currentHole !== page) {
        this.setState(state => ({ ...state, currentHole: page }))
      }
    }
  }

  public render() {
    const {
      data: { loading, scoringSession },
      screenProps: { currentUser }
    } = this.props
    const { currentHole, scrollEnabled, scrollX } = this.state
    if (loading) {
      return (
        <Loading
          text="Laddar hål och sånt..."
          backgroundColor={colors.blue}
          color={colors.lightGray}
        />
      )
    }

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

    const holesCount = scoringSession.course.holes.length

    return (
      <Animated.View
        style={{
          flex: 1,
          height: '100%',
          alignItems: 'stretch',
          backgroundColor: colors.blue
        }}>
        <Animated.View
          style={{ height: deviceHeight - 48, transform: [{ scale: transformScale }] }}>
          <Animated.ScrollView
            style={{ width: '100%', height: '100%' }}
            ref={sv => {
              this.scrollView = sv
            }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={scrollEnabled}
            onMomentumScrollEnd={this.handlePageChange}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
              { useNativeDriver: true }
            )}
            horizontal={true}
            paging={true}
            bounces={true}
            pagingEnabled={true}
            removeClippedSubviews={true}>
            {scoringSession.course.holes.map(h => (
              <HoleView
                key={`hole_view_${h.id}`}
                hole={h}
                isActive={h.number === currentHole}
                playing={scoringSession.scoringItems}
                holesCount={holesCount}
                scrollX={scrollX}
                scoringSession={scoringSession}
              />
            ))}
            <FinishScoringSession
              playing={scoringSession.scoringItems}
              scoringSession={scoringSession}
              scrollX={scrollX}
              finishRound={this.finishRound}
            />
          </Animated.ScrollView>
        </Animated.View>

        <ScoringFooter
          number={currentHole}
          maxNumber={holesCount}
          showMenu={() => this.showModal('menu')}
          showLeaderboard={() => this.showModal('leaderboard')}
        />

        <Animated.View pointerEvents="none" style={[styles.backdrop, { opacity: this.modal }]} />

        <Animated.View
          onStartShouldSetResponder={() => this.closeModal()}
          style={{
            backgroundColor: 'transparent',
            height: deviceHeight,
            width: '100%',
            transform: [{ translateY: tapSuprresorPosition }]
          }}
        />

        <AnimatedModal height={MENU_HEIGHT} position={menuPosition}>
          <ScoringMenu
            onClose={() => this.closeModal('menu')}
            onPreview={() => this.changeHole(holesCount + 1)}
            cancelRound={this.cancelRound}
            holes={scoringSession.course.holes}
            currentHole={currentHole}
            changeHole={this.changeHole}
          />
        </AnimatedModal>

        <AnimatedModal height={LEADERBOARD_HEIGHT} position={leaderboardPosition}>
          <ScoringLeaderboard
            showHeader={true}
            onClose={() => this.closeModal('leaderboard')}
            scoringType={scoringSession.scoringType}
            scoringSessionId={scoringSession.id}
            currentUserId={currentUser.id}
            teamEvent={scoringSession.teamEvent}
          />
        </AnimatedModal>
      </Animated.View>
    )
  }
}

export default compose(
  withScoringSessionQuery,
  withCancelRoundMutation,
  withFinishRoundMutation
)(ScoreEvent)
