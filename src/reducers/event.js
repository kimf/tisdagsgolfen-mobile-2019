const initialState = { currentPlayer: null, event: null, playing: [], currentHole: 1 }

export const addPlayer = (playerId, name) => ({
  type: 'ADD_PLAYER',
  payload: { playerId, name }
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

      if (action.operationName === 'getAllSeasons') {
        const currentPlayer = action.result.data.user
        currentPlayer.strokes = 0
        return {
          ...state,
          currentPlayer
        }
      }

      return state
    }

    default:
      return state
  }
}
