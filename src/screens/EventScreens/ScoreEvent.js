import React, { Component, PropTypes } from 'react'
import { View, Dimensions, LayoutAnimation } from 'react-native'

import HoleView from 'Scoring/HoleView'
import HoleFooter from 'Scoring/HoleFooter'
import Loading from 'shared/Loading'

import { withScoringSessionQuery } from 'queries/scoringSessionQuery'
import { spring } from 'animations'

const { shape, bool } = PropTypes
const deviceHeight = Dimensions.get('window').height

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

  constructor(props) {
    super(props)
    this.state = {
      currentHole: 1
    }
  }

  onCancel = () => {
    // await this.props.onCancelEvent()
    this.props.navigation.goBack()
  }

  changeHole = (currentHole) => {
    LayoutAnimation.configureNext(spring)
    this.setState(state => ({ ...state, currentHole }))
  }

  render() {
    const { data } = this.props
    const { currentHole } = this.state
    if (data.loading) {
      return <Loading text="Laddar hål och sånt..." />
    }

    const scoringSession = data.scoringSession
    const teamEvent = scoringSession.event.teamEvent

    const hole = scoringSession.course.holes.find(h => h.number === currentHole)
    const playing = teamEvent ? scoringSession.scoringTeams : scoringSession.scoringPlayers

    return (
      <View style={{ flex: 1, height: '100%', alignItems: 'stretch' }}>
        <View style={{ height: deviceHeight - 64 }}>
          <HoleView
            key={`hole_view_${hole.id}`}
            hole={hole}
            playing={playing}
            holesCount={scoringSession.course.holes.length}
            event={scoringSession.event}
            scoringSessionId={scoringSession.id}
            onChangeHole={this.changeHole}
          />
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
