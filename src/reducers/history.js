const INIT_HISTORY = 'INIT_HISTORY'
const CHANGE_HISTORY = 'CHANGE_HISTORY'

export const initHistory = history => ({
  type: INIT_HISTORY,
  payload: { history }
})

export const changeHistory = history => ({
  type: CHANGE_HISTORY,
  payload: { history }
})

const initialState = {
  location: null,
  index: 0,
  entries: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_HISTORY:
    case CHANGE_HISTORY: {
      const { location, index, entries } = action.payload.history
      return {
        ...state,
        location,
        index,
        entries
      }
    }
    default:
      return state
  }
}
