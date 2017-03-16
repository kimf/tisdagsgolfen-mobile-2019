import update from 'immutability-helper'

const initialState = {
  event: null,
  playing: [],
  currentHole: 1,
  isStarted: false,
  currentlyScoring: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BEGIN_SCORING_SETUP': {
      let firstItem
      if (action.event.teamEvent) {
        firstItem = {
          id: 0,
          players: [{ ...action.player }],
          strokes: 0,
          eventScores: []
        }
      } else {
        firstItem = {
          ...action.player,
          strokes: 0,
          eventScores: []
        }
      }

      return {
        event: action.event,
        playing: [firstItem],
        currentHole: state.currentHole
      }
    }

    case 'ADDED_PLAYER_TO_EVENT': {
      return {
        ...state,
        playing: [
          ...state.playing,
          {
            ...action.player,
            strokes: action.strokes,
            eventScores: []
          }
        ]
      }
    }
    case 'REMOVED_PLAYER_FROM_EVENT': {
      const playingIndex = state.playing.findIndex(p => p.id === action.player.id)
      const playing = update(state.playing, { $splice: [[playingIndex, 1]] })
      return {
        ...state,
        playing
      }
    }

    case 'CHANGED_PLAYER_STROKES': {
      const playingIndex = state.playing.findIndex(p => p.id === action.player.id)
      const playing = update(
        state.playing,
        { [playingIndex]: { strokes: { $set: action.strokes } } }
      )
      return {
        ...state,
        playing
      }
    }

    case 'ADDED_TEAM_TO_EVENT': {
      const newItem = {
        id: state.playing.length,
        players: [],
        strokes: 0,
        eventScores: []
      }
      return {
        ...state,
        playing: state.playing.concat(newItem)
      }
    }

    case 'ADDED_PLAYER_TO_TEAM': {
      const teamIndex = state.playing.findIndex(p => p.id === action.team.id)
      const playing = update(
        state.playing,
        { [teamIndex]: { players: { $push: [action.player] } } }
      )

      return {
        ...state,
        playing
      }
    }

    case 'REMOVED_PLAYER_FROM_TEAM': {
      const teamIndex = state.playing.findIndex(p => p.id === action.team.id)
      const playerIndex = state.playing[teamIndex].players.findIndex(p => p.id === action.player.id)
      const playing = update(
        state.playing, {
          [teamIndex]: {
            players: { $splice: [[playerIndex, 1]] }
          }
        }
      )
      return {
        ...state,
        playing
      }
    }

    case 'REMOVED_TEAM_FROM_EVENT': {
      const playingIndex = state.playing.findIndex(p => p.id === action.team.id)
      const playing = update(state.playing, { $splice: [[playingIndex, 1]] })
      return {
        ...state,
        playing
      }
    }

    case 'CHANGED_TEAM_STROKES': {
      const playingIndex = state.playing.findIndex(p => p.id === action.team.id)
      const playing = update(
        state.playing,
        { [playingIndex]: { strokes: { $set: action.strokes } } }
      )

      return {
        ...state,
        playing
      }
    }

    case 'START_SCORING_INPUT': {
      const playing = state.playing.find(p => p.id === action.playerId)
      const teamEvent = state.event.teamEvent
      const currentlyScoring = {
        ...action,
        playerName: teamEvent ? `Lag ${playing.id}` : `${playing.firstName} ${playing.lastName}`
      }
      delete currentlyScoring.type
      return {
        ...state,
        currentlyScoring
      }
    }

    case 'STOP_SCORING_INPUT':
      return {
        ...state,
        currentlyScoring: false
      }

    case 'CANCEL_EVENT':
      return initialState

    case 'START_PLAY': {
      return {
        ...state,
        isStarted: true
      }
    }

    default:
      return state
  }
}
