import React, { Component, PropTypes } from 'react'
import { View, Dimensions, LayoutAnimation, ScrollView } from 'react-native'

import HoleView from 'Scoring/HoleView'
import HoleFooter from 'Scoring/HoleFooter'
import HoleHeader from 'Scoring/HoleHeader'
import Loading from 'shared/Loading'
import { colors } from 'styles'
import { withScoringSessionQuery } from 'queries/scoringSessionQuery'
import { ease } from 'animations'

const { shape, bool } = PropTypes
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export class ScoreEvent extends Component {
  static navigationOptions = {
    header: () => ({
      visible: false
    }),
    cardStack: {
      gesturesEnabled: false
    }
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
      scrollEnabled: true
    }
  }

  onCancel = () => {
    // await this.props.onCancelEvent()
    this.props.navigation.goBack()
  }

  changeHole = (nextHole) => {
    this.setState((state) => {
      LayoutAnimation.configureNext(ease)
      this.scrollView.scrollTo({ x: (nextHole * deviceWidth) - deviceWidth, animated: true })
      return { ...state, currentHole: nextHole }
    })
  }

  handlePageChange = (e) => {
    const offset = e.nativeEvent.contentOffset
    if (offset) {
      const page = Math.round(offset.x / deviceWidth) + 1
      if (this.state.currentHole !== page) {
        LayoutAnimation.configureNext(ease)
        this.setState(state => ({ ...state, currentHole: page }))
      }
    }
  }

  render() {
    const { data } = this.props
    const { currentHole, scrollEnabled } = this.state
    if (data.loading) {
      return <Loading text="Laddar hål och sånt..." />
    }

    const scoringSession = data.scoringSession
    const teamEvent = scoringSession.event.teamEvent

    const hole = scoringSession.course.holes.find(h => h.number === currentHole)
    const playing = teamEvent ? scoringSession.scoringTeams : scoringSession.scoringPlayers

    return (
      <View style={{ flex: 1, height: '100%', alignItems: 'stretch', backgroundColor: colors.green }}>
        <View style={{ height: deviceHeight - 44 }}>
          <HoleHeader {...hole} />
          <ScrollView
            style={{ width: '100%', height: '100%' }}
            ref={(sv) => { this.scrollView = sv }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={scrollEnabled}
            onMomentumScrollEnd={this.handlePageChange}
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
                scoringSessionId={scoringSession.id}
              />
            ))}
          </ScrollView>
        </View>
        <HoleFooter
          number={currentHole}
          maxNumber={scoringSession.course.holes.length}
          changeHole={this.changeHole}
        />
      </View>
    )
  }
}

export default withScoringSessionQuery(ScoreEvent)
