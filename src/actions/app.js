import { getCache, setCache } from 'utils'

const didLogout = () => ({
  type: 'LOGGED_OUT'
})

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

export const logout = () => (
  (dispatch, getState) => {
    const email = getState().email
    setCache('currentUser', { email }).then(() => {
      dispatch(didLogout())
    })
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

export const changeSeason = seasonId => ({
  type: 'CHANGE_SEASON',
  payload: { seasonId }
})

export const changeSort = sorting => ({
  type: 'CHANGE_SORT',
  payload: { sorting }
})
