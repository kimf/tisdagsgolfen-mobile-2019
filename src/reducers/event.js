const initialState = { currentPlayer: null, event: null, playing: [], currentHole: 1 }

export const addPlayer = (playerId, name) => ({
  type: 'ADD_PLAYER',
  payload: { playerId, name }
})

export const cancelEvent = () => ({
  type: 'CANCEL_EVENT'
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PLAYER': {
      const { event, playerId, name } = action.payload
      return {
        ...state,
        event,
        playerId,
        name
      }
    }

    case 'APOLLO_QUERY_RESULT': {
      if (action.operationName === 'getAllUsers') {
        return {
          ...state,
          playing: [state.currentPlayer]
        }
      }

      return state
    }

    case 'LOGGED_IN': {
      const { json } = action.payload
      const currentPlayer = json.user
      currentPlayer.strokes = 0

      return {
        ...state,
        currentPlayer
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
