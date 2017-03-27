import React, { Component, PropTypes } from 'react'
import { Animated, View } from 'react-native'

import HoleView from 'Scoring/HoleView'
import ScoringFooter from 'Scoring/ScoringFooter'
import Loading from 'shared/Loading'
import { colors, deviceHeight, deviceWidth } from 'styles'
import { withScoringSessionQuery } from 'queries/scoringSessionQuery'

const { shape, bool } = PropTypes

export class ScoreEvent extends Component {
  static navigationOptions = {
    header: () => ({ visible: false }),
    tabBar: () => ({ visible: false }),
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

  constructor(props) {
    super(props)
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

  changeHole = (nextHole) => {
    this.setState((state) => {
      this.scrollView.scrollTo({ x: (nextHole * deviceWidth) - deviceWidth, animated: true })
      return { ...state, currentHole: nextHole }
    })
  }

  gotoMenu = () => {
    this.props.navigation.navigate('ScoringMenu')
  }

  gotoLeaderboard = () => {
    this.props.navigation.navigate('ScoringLeaderboard')
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

    return (
      <View style={{ flex: 1, height: '100%', alignItems: 'stretch', backgroundColor: colors.green }}>
        <View style={{ height: deviceHeight - 48 }}>
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
        </View>

        <ScoringFooter
          number={currentHole}
          maxNumber={scoringSession.course.holes.length}
          gotoMenu={this.gotoMenu}
          gotoLeaderboard={this.gotoLeaderboard}
        />
      </View>
    )
  }
}

export default withScoringSessionQuery(ScoreEvent)
