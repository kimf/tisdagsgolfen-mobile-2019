import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'

import EventSetupPlayingCard from 'Events/EventSetupPlayingCard'
import TGText from 'shared/TGText'

import {
  cancelEvent,
  removePlayerFromTeam,
  changeTeamStrokes,
  removeTeam,
  addTeam
} from 'reducers/event'


// userId, seasonId
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

  state = { course: null }

  onNavigatorEvent = (event) => {
    const { navigator, onCancelEvent, onAddTeam } = this.props
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        onCancelEvent()
        navigator.dismissModal()
      }
    }
  }

  openAddPlayer = (team) => {
    this.props.navigator.showModal({
      screen: 'tisdagsgolfen.NewPlayer',
      title: `Lägg till i Lag ${team.id + 1}`,
      passProps: {
        team: team
      }
    })
  }

  render() {
    const { playing, event, onRemove, onAddTeam, onChangeStrokes, onRemovePlayerFromTeam } = this.props
    if (!event) {
      return null
    }

    return (
      <View style={{ flex: 1 }}>
        <TGText
          viewStyle={{ width: '100%', padding: 10, backgroundColor: '#ccc' }}
          style={{ fontSize: 12, fontWeight: 'bold', color: '#888', textAlign: 'center' }}
          onPress={onAddTeam}
        >
          + LÄGG TILL LAG
        </TGText>
        <ScrollView>
          { playing.map((pl) => {
            const props = {
              onRemove,
              onChangeStrokes,
              onRemovePlayerFromTeam,
              onAddPlayerToTeam: () => this.openAddPlayer(pl),
              teamEvent: true
            }
            return <EventSetupPlayingCard key={`setup_pl_${pl.id}`} item={pl} {...props} />
          })}
        </ScrollView>
        <TGText
          viewStyle={{ alignSelf: 'center', width: '100%', paddingVertical: 10, backgroundColor: 'green' }}
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
  onChangeStrokes: func.isRequired,
  onAddTeam: func.isRequired,
  onRemovePlayerFromTeam: func.isRequired
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
    onRemove: (team) => {
      dispatch(removeTeam(team))
    },
    onChangeStrokes: (team, strokes) => {
      dispatch(changeTeamStrokes(team, strokes))
    },
    onRemovePlayerFromTeam: (team, player) => {
      dispatch(removePlayerFromTeam(team, player))
    },
    onAddTeam: () => dispatch(addTeam())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(SetupIndividualEvent)
