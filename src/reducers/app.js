const initialState = {
  loggedIn: false,
  currentSeason: null,
  currentUser: null,
  seasons: [],
  play: {
    course: null,
    teamEvent: false,
    isStrokes: false,
    currentHole: 1
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SEASON': {
      const currentSeason = state.seasons.find(s => s.id === action.seasonId)
      return { ...state, currentSeason }
    }

    case 'LOGGED_IN': {
      return {
        ...state,
        loggedIn: true
      }
    }

    case 'LOGGED_OUT': {
      const currentUser = { email: state.currentUser.email }
      return { ...initialState, currentUser }
    }

    case 'SET_PLAY_VALUE': {
      const { key, value } = action
      const play = {
        ...state.play,
        [key]: value
      }
      return { ...state, play }
    }

    case 'CHANGE_CURRENT_HOLE': {
      const { holeNumber } = action
      const play = {
        ...state.play,
        currentHole: holeNumber
      }
      return {
        ...state,
        play
      }
    }

    case 'APOLLO_QUERY_RESULT': {
      if (action.operationName === 'mainQuery') {
        const data = action.result.data
        const currentUser = data.user
        const seasons = data.seasons
        const currentSeason = seasons[0]
        const activeScoringSession = currentUser.scoringSessions[0]
        // delete currentUser.scoringSession
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
      if (action.operationName === 'cancelRoundMutation') {
        return {
          ...state,
          activeScoringSession: null,
          play: {
            ...initialState.play
          }
        }
      }

      if (action.operationName === 'finishRoundMutation') {
        return {
          ...state,
          activeScoringSession: null,
          play: {
            ...initialState.play
          }
        }
      }

      if (action.operationName === 'createScoringSession') {
        const activeScoringSession = action.result.data.createScoringSession
        return {
          ...state,
          activeScoringSession,
          play: {
            course: activeScoringSession.course,
            teamEvent: activeScoringSession.teamEvent,
            isStrokes: activeScoringSession.scoringType === 'strokes',
            currentHole: 1
          }
        }
      }

      return state
    }

    default:
      return state
  }
}
