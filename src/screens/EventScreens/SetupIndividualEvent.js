import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import EventSetupPlayingCard from 'Events/EventSetupPlayingCard'
import TGText from 'shared/TGText'

import {
  cancelEvent,
  removePlayerFromEvent,
  changePlayerStrokes
} from 'reducers/event'


// userId, seasonId
class SetupIndividualEvent extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Avbryt',
        id: 'cancel'
      }
    ],
    rightButtons: [
      {
        // eslint-disable-next-line import/no-unresolved
        icon: require('../../images/plus.png'),
        id: 'addPlayer'
      }
    ]
  }

  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  state = { course: null }

  onNavigatorEvent = (event) => {
    const { navigator, onCancelEvent } = this.props
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        onCancelEvent()
        navigator.dismissModal()
      }
      if (event.id === 'addPlayer') {
        navigator.showModal({
          screen: 'tisdagsgolfen.NewPlayer',
          title: 'Lägg till spelare'
        })
      }
    }
  }

  render() {
    const { playing, event, onRemove, onChangeStrokes } = this.props
    if (!event) {
      return null
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          { playing.map((pl) => {
            const props = { onRemove, onChangeStrokes, teamEvent: false }
            return <EventSetupPlayingCard key={`setup_pl_${pl.id}`} item={pl} {...props} />
          })}
        </ScrollView>
        <TGText
          viewStyle={{ alignSelf: 'center', position: 'absolute', bottom: 20, width: '90%', paddingVertical: 10, backgroundColor: 'green' }}
          style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}
          onPress={() => {}}
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
    course: string
  }),
  playing: arrayOf(shape()).isRequired,
  navigator: shape().isRequired,
  onCancelEvent: func.isRequired,
  onRemove: func.isRequired,
  onChangeStrokes: func.isRequired
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
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SetupIndividualEvent)
