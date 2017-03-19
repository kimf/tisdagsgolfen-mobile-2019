import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'

import HoleView from 'Scoring/HoleView'
import Loading from 'shared/Loading'

import { withScoringSessionQuery } from 'queries/scoringSessionQuery'

const { shape, bool } = PropTypes

export class ScoreEvent extends Component {
  static scrollView = null

  static propTypes = {
    data: shape({
      loading: bool,
      scoringSession: shape()
    }),
    navigator: shape().isRequired
  }

  static defaultProps = {
    data: {
      loading: true,
      scoringSession: null
    }
  }

  static navigatorStyle = {
    navBarHidden: true,
    statusBarHidden: false
  }

  constructor(props) {
    super(props)
    this.state = {
      scrollEnabled: true
    }
  }

  /*
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentHole !== this.props.currentHole) {
      this.scrollView.scrollTo({ x: (nextProps.currentHole * width) - width, animated: true })
    }
  }
  */

  onCancel = () => {
    // await this.props.onCancelEvent()
    this.props.navigator.dismissAllModals({ animated: true })
  }

  toggleScroll = () => {
    this.setState(state => ({ scrollEnabled: !state.scrollEnabled }))
  }

  render() {
    const { data, navigator } = this.props
    const { scrollEnabled } = this.state
    if (data.loading) {
      return <Loading text="Laddar hål och sånt..." />
    }

    const scoringSession = data.scoringSession
    const teamEvent = scoringSession.event.teamEvent

    return (
      <View style={{ width: '100%', backgroundColor: '#efc' }}>
        <ScrollView
          style={{ width: '100%', height: '100%' }}
          ref={(sv) => { this.scrollView = sv }}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
          horizontal
          paging
          bounces
          pagingEnabled
          removeClippedSubviews
        >
          {scoringSession.course.holes.map((hole) => {
            const playing = teamEvent ? scoringSession.scoringTeams : scoringSession.scoringPlayers
            return (
              <HoleView
                key={`hole_view_${hole.id}`}
                hole={hole}
                playing={playing}
                holesCount={scoringSession.course.holes.length}
                event={scoringSession.event}
                navigator={navigator}
                scoringSessionId={scoringSession.id}
                toggleScroll={this.toggleScroll}
              />
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

export default withScoringSessionQuery(ScoreEvent)
