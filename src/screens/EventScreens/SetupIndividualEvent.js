import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import EventSetupPlayingCard from 'Scoring/EventSetupPlayingCard'
import TGText from 'shared/TGText'

import { cancelEvent, removePlayerFromEvent, changePlayerStrokes, startPlay } from 'actions/event'

class SetupIndividualEvent extends Component {
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

  onNavigatorEvent = (event) => {
    const { navigator, onCancelEvent } = this.props
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        onCancelEvent()
        navigator.dismissModal()
      }
    }
  }

  openAddPlayer = () => {
    this.props.navigator.showModal({
      screen: 'tisdagsgolfen.NewPlayer',
      title: 'Lägg till spelare'
    })
  }

  startPlay = () => {
    this.props.onStartPlay()
    this.props.navigator.resetTo({
      screen: 'tisdagsgolfen.ScoreEvent',
      title: 'Scoring...',
      passProps: {},
      animated: true,
      navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
      navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
    })
  }

  render() {
    const { playing, event, onRemove, onChangeStrokes } = this.props
    if (!event) {
      return null
    }

    return (
      <View style={{ flex: 1 }}>
        <TGText
          viewStyle={{ width: '100%', padding: 10, backgroundColor: '#ccc' }}
          style={{ fontSize: 12, fontWeight: 'bold', color: '#888', textAlign: 'center' }}
          onPress={this.openAddPlayer}
        >
          + LÄGG TILL SPELARE
        </TGText>
        <ScrollView>
          {playing.map((pl) => {
            const props = { onRemove, onChangeStrokes, teamEvent: false }
            return <EventSetupPlayingCard key={`setup_pl_${pl.id}`} item={pl} {...props} />
          })}
        </ScrollView>
        <TGText
          viewStyle={{ width: '100%', paddingVertical: 10, backgroundColor: 'green' }}
          style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}
          onPress={this.startPlay}
        >
          STARTA RUNDA
        </TGText>
      </View>
    )
  }
}

const { arrayOf, bool, shape, string, func } = PropTypes

SetupIndividualEvent.propTypes = {
  event: shape({
    id: string.isRequired,
    scoringType: string.isRequired,
    status: string.isRequired,
    teamEvent: bool.isRequired,
    club: string,
    course: shape({
      club: string,
      name: string
    })
  }),
  playing: arrayOf(shape()).isRequired,
  navigator: shape().isRequired,
  onCancelEvent: func.isRequired,
  onRemove: func.isRequired,
  onChangeStrokes: func.isRequired,
  onStartPlay: func.isRequired
}

SetupIndividualEvent.defaultProps = {
  event: null
}


const mapStateToProps = state => (
  {
    playing: state.event.playing,
    event: state.event.event
  }
)

const mapDispatchToProps = dispatch => (
  {
    onCancelEvent: () => {
      dispatch(cancelEvent())
    },
    onRemove: (player) => {
      dispatch(removePlayerFromEvent(player))
    },
    onChangeStrokes: (player, strokes) => {
      dispatch(changePlayerStrokes(player, strokes))
    },
    onStartPlay: () => dispatch(startPlay())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SetupIndividualEvent)
