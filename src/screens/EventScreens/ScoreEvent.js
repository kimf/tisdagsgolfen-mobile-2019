import React, { Component, PropTypes } from 'react'
import { View, ScrollView, Dimensions, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import HoleView from 'Scoring/HoleView'
import Loading from 'shared/Loading'
import ScoreInput from 'Scoring/ScoreInput'
import { startScoringInput, stopScoringInput, cancelEvent } from 'actions/event'

const width = Dimensions.get('window').width

class ScoreEvent extends Component {
  static scrollView = null

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentHole !== this.props.currentHole) {
      this.scrollView.scrollTo({ x: (nextProps.currentHole * width) - width, animated: true })
    }
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        this.props.navigator.dismissAllModals({ animated: true })
        this.props.onCancelEvent()
      }
    }
  }

  render() {
    const { data, event, playing, navigator, scoring, onStartScoring, onStopScoring } = this.props
    if (data.loading) {
      return <Loading text="Laddar hål och sånt..." />
    }

    const scoringId = scoring ? scoring.scoreItem.id : false

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
          {data.holes.map(hole => (
            <HoleView
              key={`hole_view_${hole.id}`}
              hole={hole}
              playing={playing}
              holesCount={data.holes.length}
              event={event}
              navigator={navigator}
              onStartScoring={onStartScoring}
              scoringId={scoringId}
            />
          ))}
        </ScrollView>
        {scoring
          ? <ScoreInput
            {...scoring}
            eventId={event.id}
            teamEvent={event.teamEvent}
            onClose={onStopScoring}
          />
          : null
        }
      </View>
    )
  }
}

ScoreEvent.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    holes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      number: PropTypes.number,
      index: PropTypes.number,
      par: PropTypes.number
    }))
  }),
  currentHole: PropTypes.number.isRequired,
  event: PropTypes.shape(),
  playing: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  navigator: PropTypes.shape().isRequired,
  scoring: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.bool
  ]).isRequired,
  onStartScoring: PropTypes.func.isRequired,
  onStopScoring: PropTypes.func.isRequired,
  onCancelEvent: PropTypes.func.isRequired
}

ScoreEvent.defaultProps = {
  data: {
    loading: true,
    holes: []
  },
  event: null
}

const mapDispatchToProps = dispatch => ({
  onStartScoring: (scoreItem, holeId, eventId, playerId) => {
    dispatch(startScoringInput(scoreItem, holeId, eventId, playerId))
  },
  onStopScoring: () => dispatch(stopScoringInput()),
  onCancelEvent: () => dispatch(cancelEvent())
})

const mapStateToProps = state => ({
  scoring: state.event.currentlyScoring,
  event: state.event.event,
  courseId: state.event.event ? state.event.event.course.id : null,
  playing: state.event.playing,
  currentHole: state.event.currentHole
})

const holesQuery = gql`
  query scoringHoles ($courseId: ID!, $eventId: ID!) {
    holes: allHoles (
      orderBy: number_ASC
      filter: { course: { id: $courseId } }
    ) {
      id
      number
      par
      index
      liveScores (
        filter: { event: { id: $eventId } }
      ) {
        id
        extraStrokes
        strokes
        putts
        points
        beers
        user {
          id
        }
      }
    }
  }
`

export default compose(
  connect(mapStateToProps, mapDispatchToProps, null),
  graphql(holesQuery, {
    options: ({ courseId, event }) => ({
      forceFetch: false,
      skip: !courseId,
      variables: { courseId, eventId: (event ? event.id : null) }
    })
  })
)(ScoreEvent)
