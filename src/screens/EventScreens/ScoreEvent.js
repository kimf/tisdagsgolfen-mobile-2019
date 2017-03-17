import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'

import HoleView from 'Scoring/HoleView'
import Loading from 'shared/Loading'
import ScoreInput from 'Scoring/ScoreInput'

import scoringSessionQuery, { withScoringSessionQuery } from 'queries/scoringSessionQuery'

const { shape, bool } = PropTypes

class ScoreEvent extends Component {
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
    },
    event: null
  }

  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Avbryt',
        id: 'cancel'
      }
    ]
  }

  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  /*
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentHole !== this.props.currentHole) {
      this.scrollView.scrollTo({ x: (nextProps.currentHole * width) - width, animated: true })
    }
  }
  */

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        // await this.props.onCancelEvent()
        this.props.navigator.dismissAllModals({ animated: true })
      }
    }
  }

  render() {
    const { data, navigator } = this.props
    if (data.loading) {
      return <Loading text="Laddar hål och sånt..." />
    }

    const scoringSession = data.scoringSession
    const teamEvent = scoringSession.event.teamEvent

    const scoring = false  // tmp should be state!

    return (
      <View style={{ width: '100%' }}>
        <ScrollView
          style={{ width: '100%' }}
          ref={(sv) => { this.scrollView = sv }}
          showsHorizontalScrollIndicator={false}
          scrollEnabled
          horizontal
          paging
          bounces
          pagingEnabled
          removeClippedSubviews
        >
          {scoringSession.course.holes.map((hole) => {
            const playing = teamEvent ? scoringSession.scoringTeams : scoringSession.scoringPlayers
            const liveScores = scoringSession.liveScores.find(ls => ls.hole.id === hole.id)
            return (
              <HoleView
                key={`hole_view_${hole.id}`}
                hole={hole}
                playing={playing}
                liveScores={liveScores}
                holesCount={scoringSession.course.holes.length}
                event={scoringSession.event}
                navigator={navigator}
              />
            )
          })}
        </ScrollView>
        {scoring
          ? <ScoreInput
            {...scoring}
            eventId={scoringSession.event.id}
            teamEvent={scoringSession.event.teamEvent}
            onClose={() => { }}
          />
          : null
        }
      </View>
    )
  }
}

export default withScoringSessionQuery(ScoreEvent)
