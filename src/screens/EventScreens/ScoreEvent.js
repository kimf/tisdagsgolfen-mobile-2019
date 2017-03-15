import React, { Component, PropTypes } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import HoleView from 'Scoring/HoleView'

import { saveEventScore } from 'reducers/event'

import styles from 'styles'

const width = Dimensions.get('window').width

class ScoreEvent extends Component {
  static scrollView = null

  componentDidMount() {
    this.scrollView.scrollTo({ x: (this.props.currentHole * width) - width, animated: false })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentHole !== this.props.currentHole) {
      this.scrollView.scrollTo({ x: (nextProps.currentHole * width) - width, animated: true })
    }
  }

  render() {
    const { event, onSaveEventScore, playing } = this.props

    const holeItems = []
    event.courseData.holes.forEach((hole) => {
      holeItems.push(
        <HoleView
          key={`hole_view_${hole.id}`}
          hole={hole}
          playing={playing}
          holesCount={event.courseData.holes_count}
          event={event}
          saveEventScore={onSaveEventScore}
        />
      )
    })

    return (
      <View style={[styles.container, { backgroundColor: '#F9F9F9' }]}>
        <ScrollView
          ref={(sv) => { this.scrollView = sv }}
          showsHorizontalScrollIndicator={false}
          scrollEnabled
          horizontal
          paging
          bounces
          pagingEnabled
          removeClippedSubviews
        >
          {holeItems}
        </ScrollView>
      </View>
    )
  }
}

ScoreEvent.propTypes = {
  currentHole: PropTypes.number.isRequired,
  event: PropTypes.shape().isRequired,
  playing: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSaveEventScore: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
  event: state.event.event,
  playing: state.event.playing,
  currentHole: state.event.currentHole
})

const mapDispatchToProps = dispatch => (
  {
    onSaveEventScore: (eventId, item, eventScore, strokes, putts, points) => {
      dispatch(saveEventScore(eventId, item, eventScore, strokes, putts, points))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreEvent)
