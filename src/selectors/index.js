import { createSelector } from 'reselect'

const currentSeasonId = state => state.app.seasonId
const getSeasons = state => state.app.seasons

// eslint-disable-next-line import/prefer-default-export
export const getCurrentSeason = createSelector(
  [currentSeasonId, getSeasons],
  (seasonId, seasons) => seasons.find(s => s.id === seasonId)
)
