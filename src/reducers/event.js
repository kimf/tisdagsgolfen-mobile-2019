import update from 'immutability-helper'

const initialState = { event: null, playing: [], currentHole: 1 }

const settingUpEvent = (event, player) => ({
  type: 'BEGIN_SCORING_SETUP', event, player
})

export const startSettingUpEvent = event => (
  (dispatch, getState) => {
    const player = getState().app.user
    dispatch(settingUpEvent(event, player))
  }
)

export const cancelEvent = () => ({
  type: 'CANCEL_EVENT'
})

export const addPlayerToEvent = (player, strokes) => ({
  type: 'ADDED_PLAYER_TO_EVENT', player, strokes
})

export const removePlayerFromEvent = player => ({
  type: 'REMOVED_PLAYER_FROM_EVENT', player
})

export const changePlayerStrokes = (player, strokes) => ({
  type: 'CHANGED_PLAYER_STROKES', player, strokes
})

export const addPlayerToTeam = (team, player) => ({
  type: 'ADDED_PLAYER_TO_TEAM', team, player
})
export const removePlayerFromTeam = (team, player) => ({
  type: 'REMOVED_PLAYER_FROM_TEAM', team, player
})
export const removeTeam = team => ({
  type: 'REMOVED_TEAM_FROM_EVENT', team
})
export const addTeam = () => ({
  type: 'ADDED_TEAM_TO_EVENT'
})
export const changeTeamStrokes = (team, strokes) => ({
  type: 'CHANGED_TEAM_STROKES', team, strokes
})


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

    case 'ADDED_PLAYER_TO_EVENT':
      return {
        ...state,
        playing: [
          ...state.playing,
          {
            ...action.player,
            strokes: action.strokes
          }
        ]
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
            players: { $splice: [[playerIndex: 1]] }
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

    case 'CANCEL_EVENT':
      return {
        ...state,
        event: null,
        currentHole: 1,
        playing: [state.currentPlayer]
      }

    default:
      return state
  }
}

// import Immutable from 'seamless-immutable';
// const initialState = Immutable({ event: null, playing: [], currentHole: 1 });

// export default function reducer(state = initialState, action = {}) {
//   switch (action.type) {

//     case "CHANGED_HOLE":
//       return Immutable({
//         event: state.event,
//         playing: state.playing,
//         currentHole: action.holeNr
//       })

//     case "CREATED_EVENT_SCORE":
//       //playerId, holeNr, data
//       const playingPlayers = state.playing.map((player) => {
//         if (player.id === action.playerId) {
//           const eventScores = Immutable(player.eventScores).concat(action.data)
//           return Immutable(player).merge({ eventScores: eventScores })
//         }
//         return Immutable(player)
//       })

//       return Immutable({
//         event: state.event,
//         playing: playingPlayers,
//         currentHole: state.currentHole
//       })

//     case "PUSHING_SCORE":
//       const pushingPlayers = state.playing.map((player) => {
//         if (player.id === action.playerId) {
//           const eventScores = player.eventScores.map((es) => {
//             if (es.hole === action.holeNr) {
//               return Immutable(es).merge(
//                 {
//                   isBeingSaved: true,
//                   isScored: false,
//                   strokes: action.strokes,
//                   putts: action.putts,
//                   points: action.points
//                 }
//               )
//             }
//             return Immutable(es);
//           })
//           return Immutable(player).merge({ eventScores })
//         }
//         return Immutable(player)
//       })

//       return Immutable({
//         event: state.event,
//         playing: pushingPlayers,
//         currentHole: state.currentHole,
//       })

//     case "SCORE_WAS_SAVED":
//       // add externalId from response.id!!!!
//       const savingPlayers = state.playing.map((player) => {
//         if (player.id === action.playerId) {
//           const eventScores = player.eventScores.map((es) => {
//             if (es.hole === action.holeNr) {
//               return Immutable(es).merge(
//                 {
//                   isBeingSaved: false,
//                   isScored: true,
//                   externalId: action.response.id
//                 }
//               )
//             }
//             return Immutable(es);
//           })
//           return Immutable(player).merge({ eventScores })
//         }
//         return Immutable(player)
//       })

//       return Immutable({
//         event: state.event,
//         playing: savingPlayers,
//         currentHole: state.currentHole
//       })

//     case "FAILED_TO_SAVE_SCORE":
//       const erroredPlayers = state.playing.map((player) => {
//         if (player.id === action.playerId) {
//           const eventScores = player.eventScores.map((es) => {
//             if (es.hole === action.holeNr) {
//               return Immutable(es).merge(
//                 {
//                   isBeingSaved: false,
//                   isScored: false,
//                   hasError: true,
//                   error: action.error
//                 }
//               )
//             }
//             return Immutable(es);
//           })
//           return Immutable(player).merge({ eventScores })
//         }
//         return Immutable(player)
//       })

//       return Immutable({
//         event: state.event,
//         playing: erroredPlayers,
//         currentHole: state.currentHole
//       })

//     case "LOGGED_OUT":
//       return initialState;

//     case "FINISHED_SCORING":
//       return initialState;

//     default:
//       return state;
//   }
// }
