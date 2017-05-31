const initialState = {
  loggedIn: false,
  currentSeason: null,
  currentUser: null,
  seasons: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      return {
        ...state,
        loggedIn: true
      }
    }

    case 'APOLLO_QUERY_RESULT': {
      if (action.operationName === 'mainQuery') {
        const data = action.result.data
        const currentUser = data.user
        const seasons = data.seasons
        const currentSeason = seasons[0]
        const activeScoringSession = currentUser.scoringSession
        delete currentUser.scoringSession
        return {
          ...state,
          seasons,
          currentUser,
          currentSeason,
          activeScoringSession
        }
      }

      return state
    }

    case 'APOLLO_MUTATION_RESULT': {
      if (action.operationName === 'cancelRoundMutation' || '') {
        return {
          ...state,
          activeScoringSession: null
        }
      }

      if (action.operationName === 'finishRoundMutation') {
        return {
          ...state,
          activeScoringSession: null
        }
      }

      return state
    }

    case 'CHANGE_SEASON': {
      const currentSeason = state.seasons.find(s => s.id === action.seasonId)
      return { ...state, currentSeason }
    }

    case 'LOGGED_OUT': {
      const currentUser = { email: state.currentUser.email }
      return { ...initialState, currentUser }
    }

    default:
      return state
  }
}
