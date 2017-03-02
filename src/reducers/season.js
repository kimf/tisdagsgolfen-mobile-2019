const CHANGE_SEASON = 'CHANGE_SEASON'
const CHANGE_SORT = 'CHANGE_SORT'
const APOLLO_QUERY_RESULT = 'APOLLO_QUERY_RESULT'

export const changeSeason = seasonId => ({
  type: CHANGE_SEASON,
  payload: { seasonId }
})

export const changeSort = sorting => ({
  type: CHANGE_SORT,
  payload: { sorting }
})

const initialState = {
  seasonId: null,
  sorting: 'totalPoints',
  seasonNavigationItems: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEASON: {
      const { seasonId } = action.payload
      const sorting = initialState.sorting
      return {
        ...state,
        sorting,
        seasonId
      }
    }

    case CHANGE_SORT: {
      const { sorting } = action.payload
      return {
        ...state,
        sorting
      }
    }

    case APOLLO_QUERY_RESULT: {
      if (action.operationName === 'getAllSeasons') {
        const seasonNavigationItems = action.result.data.seasons.map(
          s => Object.assign({ id: s.id, name: s.name })
        )
        return {
          ...state,
          seasonNavigationItems,
          seasonId: seasonNavigationItems[0].id
        }
      }
      return state
    }

    default:
      return state
  }
}
