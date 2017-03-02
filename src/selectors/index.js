import { createSelector } from 'reselect'

import { ranked } from '../utils'

const getSorting = state => state.season.sorting
const getPlayers = (state, props) => props.season.players

export const getSortedPlayers = createSelector(
  [getSorting, getPlayers],
  (sorting, players) => {
    switch (sorting) {
      case 'beers': {
        const sorted = players.slice().sort((a, b) => b.totalBeers - a.totalBeers)
        return ranked(sorted, 'beerPos', 'totalBeers')
      }
      case 'kr': {
        const sorted = players.slice().sort((a, b) => a.totalKr - b.totalKr)
        return ranked(sorted, 'krPos', 'totalKr')
      }
      default:
        return players.slice().sort((a, b) => a.position - b.position)
    }
  }
)
