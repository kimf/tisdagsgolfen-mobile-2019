const settingUpEvent = (event, player) => ({
  type: 'BEGIN_SCORING_SETUP', event, player
})

export const startSettingUpEvent = event => (
  (dispatch, getState) => {
    const player = Object.assign({}, getState().app.user)
    delete player.token
    dispatch(settingUpEvent(event, player))
  }
)

export const cancelEvent = () => ({ type: 'CANCEL_EVENT' })
export const addPlayerToEvent = (player, strokes) => ({ type: 'ADDED_PLAYER_TO_EVENT', player, strokes })
export const removePlayerFromEvent = player => ({ type: 'REMOVED_PLAYER_FROM_EVENT', player })
export const changePlayerStrokes = (player, strokes) => ({ type: 'CHANGED_PLAYER_STROKES', player, strokes })
export const addPlayerToTeam = (team, player) => ({ type: 'ADDED_PLAYER_TO_TEAM', team, player })
export const removePlayerFromTeam = (team, player) => ({ type: 'REMOVED_PLAYER_FROM_TEAM', team, player })
export const removeTeam = team => ({ type: 'REMOVED_TEAM_FROM_EVENT', team })
export const addTeam = () => ({ type: 'ADDED_TEAM_TO_EVENT' })
export const changeTeamStrokes = (team, strokes) => ({ type: 'CHANGED_TEAM_STROKES', team, strokes })
export const startPlay = () => ({ type: 'START_PLAY' })

export const stopScoringInput = () => ({ type: 'STOP_SCORING_INPUT' })
export const startScoringInput = (scoreItem, holeId, par, playerId) => ({
  type: 'START_SCORING_INPUT', scoreItem, holeId, par, playerId
})
