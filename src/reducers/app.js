const initialState = {
  loggedIn: false,
  user: null,
  seasons: null,
  seasonId: null,
  seasonClosed: null,
  sorting: 'totalPoints'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      const { token, json } = action.payload
      const { seasons, user } = json
      const seasonId = state.seasonId || seasons[0].id
      const seasonClosed = seasons.find(s => s.id === seasonId).closed
      return {
        ...state,
        loggedIn: true,
        seasons,
        user: { ...user, token },
        seasonId,
        seasonClosed
      }
    }

    case 'LOGGED_OUT': {
      const email = state.user ? state.user.email : null
      return {
        ...state,
        loggedIn: false,
        seasons: null,
        seasonId: null,
        seasonClosed: null,
        user: { email }
      }
    }

    case 'CHANGE_SEASON': {
      const { seasonId } = action.payload
      const sorting = initialState.sorting
      const seasonClosed = state.seasons.find(s => s.id === seasonId).closed
      return {
        ...state,
        sorting,
        seasonId,
        seasonClosed
      }
    }

    case 'CHANGE_SORT': {
      const { sorting } = action.payload
      return {
        ...state,
        sorting
      }
    }
    default:
      return state
  }
}
