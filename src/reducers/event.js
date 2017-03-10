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

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BEGIN_SCORING_SETUP': {
      let firstItem
      console.log(action.event.teamEvent)
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
      const playerIndex = state.playing.findIndex(p => p.id === action.player.id)
      const playing = update(state.playing, { $splice: [[playerIndex, 1]] })
      return {
        ...state,
        playing
      }
    }

    case 'CHANGED_PLAYER_STROKES': {
      const playerIndex = state.playing.findIndex(p => p.id === action.player.id)
      const playing = update(
        state.playing,
        { [playerIndex]: { strokes: { $set: action.strokes } } }
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
//     case "BEGIN_SCORING_SETUP":
//       let firstItem;
//       if(action.event.teamEvent) {
//         firstItem = Immutable({
//           id: 0,
//           players: [{id: action.player.id, name: action.player.name}],
//           strokes: 0,
//           eventScores: []
//         })
//       } else {
//         firstItem = Immutable({
//           id: action.player.id,
//           name: action.player.name,
//           strokes: 0,
//           eventScores: []
//         });
//       }

//       return Immutable({
//         event: action.event,
//         playing: Immutable([firstItem]),
//         currentHole: state.currentHole
//       })

//     case "ADDED_EVENT_TEAM":
//       const newItem = Immutable({
//         id: state.playing.length,
//         players: [],
//         strokes: 0,
//         eventScores: []
//       })
//       return Immutable({
//         event: state.event,
//         playing: Immutable(state.playing).concat(newItem),
//         currentHole: state.currentHole
//       })

//     case "ADDED_PLAYER_TO_TEAM":
//       const newPlayer = Immutable({
//         id: action.player.id,
//         name: action.player.name
//       })

//       const enhancedTeams = state.playing.map((t, index) => {
//         if(index !== action.teamIndex) {
//           return t;
//         }
//         let players = t.players.concat(newPlayer)
//         return Immutable(t).merge({players: players});
//       });

//       return Immutable({
//         event: state.event,
//         playing: Immutable(enhancedTeams),
//         currentHole: state.currentHole
//       })

//     case "CHANGED_TEAM_STROKES":
//       const strokedTeams = state.playing.map((t, index) => {
//         if(index !== action.teamIndex) {
//           return t;
//         }
//         return Immutable(t).merge({strokes: action.strokes});
//       });

//       return Immutable({
//         event: state.event,
//         playing: Immutable(strokedTeams),
//         currentHole: state.currentHole
//       })

//     case "ADDED_PLAYER_TO_EVENT":
//       const addedPlayer = Immutable({
//         id: action.player.id,
//         name: action.player.name,
//         strokes: action.strokes,
//         eventScores: []
//       });

//       return Immutable({ event: state.event, playing: state.playing.concat(addedPlayer) })

//     case "CHANGED_PLAYER_STROKES":
//       const playing = state.playing.map((player) => {
//         if (player.id === action.player.id) {
//           return Immutable(player).merge({ strokes: action.strokes})
//         }
//         return Immutable(player)
//       })

//       return Immutable({
//         event: state.event,
//         playing: playing,
//       })

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

//     case "CANCELED_SCORING":
//       return initialState;

//     case "ABORT_EVENT_SETUP":
//       return initialState;

//     default:
//       return state;
//   }
// }
