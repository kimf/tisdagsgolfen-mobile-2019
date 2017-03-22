import { setCache } from 'utils'

const didLoginOrOut = type => ({ type })

export const logout = () => (
  (dispatch, getState) => {
    const email = getState().email
    setCache('currentUser', { email }).then(() => {
      dispatch(didLoginOrOut('LOGGED_OUT'))
    })
  }
)

export const login = (email, token) => (
  (dispatch) => {
    setCache('currentUser', { email, token }).then(() => {
      dispatch(didLoginOrOut('LOGGED_IN'))
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
