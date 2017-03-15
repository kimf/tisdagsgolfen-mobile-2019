import React, { Component, PropTypes } from 'react'
import { ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import HoleView from 'Scoring/HoleView'
import Loading from 'shared/Loading'

import { saveEventScore } from 'reducers/event'

const width = Dimensions.get('window').width

class ScoreEvent extends Component {
  static scrollView = null

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentHole !== this.props.currentHole) {
      this.scrollView.scrollTo({ x: (nextProps.currentHole * width) - width, animated: true })
    }
  }

  render() {
    const { data, event, onSaveEventScore, playing } = this.props
    if (data.loading) {
      return <Loading text="Laddar hål och sånt..." />
    }

    return (
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
            saveEventScore={onSaveEventScore}
          />
        ))}
      </ScrollView>
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
  }).isRequired,
  currentHole: PropTypes.number.isRequired,
  event: PropTypes.shape().isRequired,
  playing: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSaveEventScore: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
  event: state.event.event,
  courseId: state.event.event.course.id,
  playing: state.event.playing,
  currentHole: state.event.currentHole
})

const mapDispatchToProps = dispatch => (
  {
    onSaveEventScore: (eventId, itemId, holeId, strokes, putts, points, par, extraStrokes) => {
      dispatch(saveEventScore(eventId, itemId, holeId, strokes, putts, points, par, extraStrokes))
    }
  }
)

const holesQuery = gql`
  query scoringHoles ($courseId: ID!) {
    holes: allHoles (
      orderBy: number_ASC
      filter: { course: { id: $courseId } }
    ) {
      id
      number
      par
      index
    }
  }
`

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(holesQuery, {
    options: ({ courseId }) => ({ forceFetch: false, variables: { courseId } })
  })
)(ScoreEvent)
