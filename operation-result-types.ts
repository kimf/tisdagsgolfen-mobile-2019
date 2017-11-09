/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type LiveScoreDataInput = {
  beers?: number | null
  extraStrokes?: number | null
  hole?: number | null
  index?: number | null
  par?: number | null
  playerIds?: Array<number> | null
  points?: number | null
  putts?: number | null
  strokes?: number | null
}

export type ScoringItemInput = {
  extraStrokes: number
  userIds: Array<string>
}

export type createLiveScoreMutationVariables = {
  scoringSessionId: string
  userId?: string | null
  teamIndex?: number | null
  data: LiveScoreDataInput
}

export type createLiveScoreMutation = {
  createLiveScore: {
    // id of the score
    id: string
    beers: number | null
    extraStrokes: number | null
    hole: number | null
    index: number | null
    par: number | null
    playerIds: Array<number> | null
    points: number | null
    putts: number | null
    strokes: number | null
    user: {
      // ID
      id: string
    } | null
    teamIndex: number | null
  } | null
}

export type createScoringSessionMutationVariables = {
  courseId: string
  scorerId: string
  teamEvent: boolean
  scoringType: string
  scoringItems?: Array<ScoringItemInput> | null
  startsAt: string
}

export type createScoringSessionMutation = {
  createScoringSession: {
    // id of the season
    id: string
    course: {
      id: string
      club: string
      name: string
    }
    scoringType: string
    teamEvent: boolean
  } | null
}

export type authenticateUserMutationVariables = {
  email: string
  password: string
}

export type authenticateUserMutation = {
  authenticateUser: {
    user: {
      // ID
      id: string
      // The email of this user
      email: string
      firstName: string
      lastName: string
      // The url to the photo of this user
      photo: string | null
      admin: boolean
    } | null
    token: string | null
  } | null
}

export type updateLiveScoreMutationVariables = {
  id: string
  data: LiveScoreDataInput
}

export type updateLiveScoreMutation = {
  updateLiveScore: {
    // id of the score
    id: string
    extraStrokes: number | null
    strokes: number | null
    putts: number | null
    points: number | null
    beers: number | null
  } | null
}

export type activeScoringSessionQueryQuery = {
  activeScoringSession: {
    // id of the season
    id: string
    scoringType: string
    teamEvent: boolean
    course: {
      id: string
      club: string
      name: string
    }
  } | null
}

export type coursesQueryQuery = {
  // A lot of courses and their data
  courses: Array<{
    id: string
    club: string
    name: string
    par: number
    holeCount: number
    eventCount: number
  } | null>
}

export type eventsQuery = {
  // Events by seasonId
  events: Array<{
    // id of the event
    id: string
    // Status of the event
    status: string
    startsAt: string
    scoringType: string
    teamEvent: boolean
    course: string
  }>
}

export type seasonLeaderboardQueryVariables = {
  seasonId: string
}

export type seasonLeaderboardQuery = {
  // Leaderboard for a season by seasonID
  players: Array<{
    id: string
    photo: string | null
    // The name of this user
    name: string
    average: number
    eventCount: number
    topPoints: Array<number>
    // position
    position: number
    oldAverage: number | null
    oldTotalPoints: number | null
    prevPosition: number | null
    totalPoints: number | null
    totalKr: number
    beers: number
  }>
}

export type liveLeaderboardQueryQueryVariables = {
  scoringSessionId: string
}

export type liveLeaderboardQueryQuery = {
  // Get the logged in user and related data
  user: {
    // ID
    id: string
  }
  // Live Leaderboard by scoringSessionId
  liveLeaderboard: Array<{
    id: string
    position: number
    photo: string | null
    // The name of this user
    name: string
    beers: number
    kr: number
    points: number
    strokes: number
  }>
}

export type scoringSessionQueryVariables = {
  scoringSessionId: string
}

export type scoringSessionQuery = {
  scoringSession: {
    // id of the season
    id: string
    currentHole: number
    scoringType: string
    teamEvent: boolean
    course: {
      id: string
      club: string
      name: string
      par: number
      // Holes
      holes: Array<{
        id: string
        number: number
        par: number
        index: number
      }>
    }
    scoringItems: Array<{
      extraStrokes: number
      users: Array<{
        // ID
        id: string
        firstName: string
        lastName: string
        // The url to the photo of this user
        photo: string | null
      }>
    }>
    liveScores: Array<{
      // id of the score
      id: string
      user: {
        // ID
        id: string
      } | null
      teamIndex: number | null
      beers: number | null
      extraStrokes: number | null
      hole: number | null
      index: number | null
      par: number | null
      playerIds: Array<number> | null
      points: number | null
      putts: number | null
      strokes: number | null
    }> | null
  }
}

export type seasonsQueryQuery = {
  // Seasons (Only Tisdagsgolfen in this case)
  seasons: Array<{
    // id of the season
    id: string
    // Name of the season
    name: string
    // Is it closed?
    closed: boolean
    // Url to season cover photo
    photo: string | null
  }>
}

export type getAllUsersQuery = {
  // List of users
  players: Array<{
    // ID
    id: string
    // The email of this user
    email: string
    firstName: string
    lastName: string
    // The url to the photo of this user
    photo: string | null
  }>
}
