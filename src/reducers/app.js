import { getCache, setCache } from '../utils'

const initialState = {
  loggedIn: false,
  user: null,
  seasons: null,
  seasonId: null,
  sorting: 'totalPoints'
}

export const changeSeason = seasonId => ({
  type: 'CHANGE_SEASON',
  payload: { seasonId }
})

export const changeSort = sorting => ({
  type: 'CHANGE_SORT',
  payload: { sorting }
})

const didLogout = () => ({
  type: 'LOGGED_OUT'
})

export const logout = () => (
  (dispatch, getState) => {
    const email = getState().email
    setCache('currentUser', { email }).then(() => {
      dispatch(didLogout())
    })
  }
)

const didLogin = (token, json) => ({
  type: 'LOGGED_IN',
  payload: { token, json }
})


const seasonsQuery = {
  query: '{ user { id email firstName lastName } seasons: allSeasons( orderBy: name_DESC ) { id name closed photo { url } } }'
}

const fetchSeasons = token => (
  (dispatch) => {
    fetch('https://api.graph.cool/simple/v1/ciyqax2o04t37012092ntrd7e', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(seasonsQuery)
    })
    .then(response => response.json())
    .then(json => dispatch(didLogin(token, json.data)))
  }
)

export const login = (email, token) => (
  (dispatch) => {
    setCache('currentUser', { email, token }).then(() => {
      dispatch(fetchSeasons(token))
    })
  }
)

export const getLoggedInState = () => (
  (dispatch) => {
    getCache('currentUser').then((value) => {
      if (value && value.token) {
        // TODO: Check to see if the fetching is needed! ( fetchSeasonsIfNeeded )
        dispatch(fetchSeasons(value.token))
      } else {
        dispatch(didLogout())
      }
    })
  }
)

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      const { token, json } = action.payload
      const { seasons, user } = json
      const seasonId = state.seasonId || seasons[0].id
      return {
        ...state,
        loggedIn: true,
        seasons,
        user: { ...user, token },
        seasonId
      }
    }
    case 'LOGGED_OUT':
      return {
        ...state,
        loggedIn: false,
        seasons: null,
        seasonId: null,
        user: {
          email: state.user.email
        }
      }

    case 'CHANGE_SEASON': {
      const { seasonId } = action.payload
      const sorting = initialState.sorting
      return {
        ...state,
        sorting,
        seasonId
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
