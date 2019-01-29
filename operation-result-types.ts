/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface LiveScoreDataInput {
  beers?: number | null,
  extraStrokes?: number | null,
  hole?: number | null,
  index?: number | null,
  par?: number | null,
  playerIds?: Array< number > | null,
  points?: number | null,
  putts?: number | null,
  strokes?: number | null,
};

export interface ScoringItemInput {
  extraStrokes: number,
  userIds: Array< string >,
};

export interface cancelRoundMutationMutationVariables {
  scoringSessionId: string,
};

export interface cancelRoundMutationMutation {
  deleteScoringSession:  {
    __typename: "DeleteScoringSessionPayload",
    id: string,
  } | null,
};

export interface createLiveScoreMutationVariables {
  scoringSessionId: string,
  userId: string,
  teamIndex?: number | null,
  data: LiveScoreDataInput,
};

export interface createLiveScoreMutation {
  createLiveScore:  {
    __typename: "LiveScore",
    id: string,
    beers: number | null,
    extraStrokes: number | null,
    hole: number | null,
    index: number | null,
    par: number | null,
    playerIds: Array< number > | null,
    points: number | null,
    putts: number | null,
    strokes: number | null,
    user:  {
      __typename: "User",
      id: string,
    } | null,
    teamIndex: number | null,
  } | null,
};

export interface finishRoundMutationMutationVariables {
  scoringSessionId: string,
};

export interface finishRoundMutationMutation {
  updateScoringSession:  {
    __typename: "ScoringSession",
    id: string,
  } | null,
};

export interface createScoringSessionMutationVariables {
  courseId: string,
  scorerId: string,
  teamEvent: boolean,
  scoringType: string,
  scoringItems?: Array< ScoringItemInput > | null,
  startsAt: string,
};

export interface createScoringSessionMutation {
  createScoringSession:  {
    __typename: "ScoringSession",
    id: string,
    course:  {
      __typename: "Course",
      id: string,
      club: string,
      name: string,
    },
    scoringType: string,
    teamEvent: boolean,
  } | null,
};

export interface authenticateUserMutationVariables {
  email: string,
  password: string,
};

export interface authenticateUserMutation {
  authenticateUser:  {
    __typename: "SigninUserPayload",
    user:  {
      __typename: "User",
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      photo: string | null,
      admin: boolean,
    },
    token: string,
  } | null,
};

export interface updateLiveScoreMutationVariables {
  id: string,
  data: LiveScoreDataInput,
};

export interface updateLiveScoreMutation {
  updateLiveScore:  {
    __typename: "LiveScore",
    id: string,
    extraStrokes: number | null,
    strokes: number | null,
    putts: number | null,
    points: number | null,
    beers: number | null,
  } | null,
};

export interface asQueryQuery {
  activeScoringSession:  {
    __typename: "ScoringSession",
    id: string,
    scoringType: string,
    teamEvent: boolean,
    course:  {
      __typename: "Course",
      id: string,
      club: string,
      name: string,
    },
  } | null,
};

export interface coursesQueryQuery {
  courses:  Array< {
    __typename: "Course",
    id: string,
    club: string,
    name: string,
    par: number,
    holeCount: number,
    eventCount: number,
  } | null >,
};

export interface eventQueryQueryVariables {
  eventId: string,
};

export interface eventQueryQuery {
  event:  {
    __typename: "Event",
    id: string,
    status: string,
    startsAt: string,
    scoringType: string,
    teamEvent: boolean,
    course:  {
      __typename: "Course",
      id: string,
      club: string,
      name: string,
    },
    leaderboard:  Array< {
      __typename: "EventLeaderboardUser",
      id: string,
      photo: string | null,
      name: string,
      position: number,
      eventPoints: number,
      beers: number,
      kr: number,
      value: number,
    } >,
  },
};

export interface eventsQuery {
  events:  Array< {
    __typename: "Event",
    id: string,
    status: string,
    startsAt: string,
    scoringType: string,
    teamEvent: boolean,
    course:  {
      __typename: "Course",
      id: string,
      club: string,
      name: string,
    },
  } >,
};

export interface initialQueryQuery {
  activeScoringSession:  {
    __typename: "ScoringSession",
    id: string,
    scoringType: string,
    teamEvent: boolean,
    course:  {
      __typename: "Course",
      id: string,
      club: string,
      name: string,
    },
  } | null,
  seasons:  Array< {
    __typename: "Season",
    id: string,
    name: string,
    closed: boolean,
    photo: string | null,
    eventCount: number,
    eventIds: Array< number > | null,
    winner: string | null,
    finalInfo: string | null,
    leaderboard:  Array< {
      __typename: "LeaderboardUser",
      id: string,
      photo: string | null,
      name: string,
      average: number,
      eventCount: number,
      topPoints: Array< number >,
      position: number,
      oldAverage: number | null,
      oldTotalPoints: number | null,
      prevPosition: number | null,
      totalPoints: number | null,
      totalKr: number,
      beers: number,
    } >,
  } >,
};

export interface seasonLeaderboardQueryVariables {
  seasonId: string,
  eventId: string,
};

export interface seasonLeaderboardQuery {
  players:  Array< {
    __typename: "LeaderboardUser",
    id: string,
    photo: string | null,
    name: string,
    average: number,
    eventCount: number,
    topPoints: Array< number >,
    position: number,
    oldAverage: number | null,
    oldTotalPoints: number | null,
    prevPosition: number | null,
    totalPoints: number | null,
    totalKr: number,
    beers: number,
  } >,
};

export interface liveLeaderboardQueryQueryVariables {
  scoringSessionId: string,
};

export interface liveLeaderboardQueryQuery {
  user:  {
    __typename: "User",
    id: string,
  },
  liveLeaderboard:  Array< {
    __typename: "LiveLeaderboardUser",
    id: string,
    position: number,
    photo: string | null,
    name: string,
    beers: number,
    kr: number,
    points: number,
    strokes: number,
  } >,
};

export interface scoringSessionQueryVariables {
  scoringSessionId: string,
};

export interface scoringSessionQuery {
  scoringSession:  {
    __typename: "ScoringSession",
    id: string,
    currentHole: number,
    scoringType: string,
    teamEvent: boolean,
    course:  {
      __typename: "Course",
      id: string,
      club: string,
      name: string,
      par: number,
      holes:  Array< {
        __typename: "Hole",
        id: string,
        number: number,
        par: number,
        index: number,
      } >,
    },
    scoringItems:  Array< {
      __typename: "ScoringItem",
      extraStrokes: number,
      users:  Array< {
        __typename: "User",
        id: string,
        firstName: string,
        lastName: string,
        photo: string | null,
      } >,
    } >,
    liveScores:  Array< {
      __typename: "LiveScore",
      id: string,
      user:  {
        __typename: "User",
        id: string,
      } | null,
      teamIndex: number | null,
      beers: number | null,
      extraStrokes: number | null,
      hole: number | null,
      index: number | null,
      par: number | null,
      playerIds: Array< number > | null,
      points: number | null,
      putts: number | null,
      strokes: number | null,
    } > | null,
  },
};

export interface seasonQueryQueryVariables {
  seasonId?: string | null,
};

export interface seasonQueryQuery {
  season:  {
    __typename: "Season",
    id: string,
    name: string,
    closed: boolean,
    photo: string | null,
    eventCount: number,
    eventIds: Array< number > | null,
    winner: string | null,
    finalInfo: string | null,
    leaderboard:  Array< {
      __typename: "LeaderboardUser",
      id: string,
      photo: string | null,
      name: string,
      average: number,
      eventCount: number,
      topPoints: Array< number >,
      position: number,
      oldAverage: number | null,
      oldTotalPoints: number | null,
      prevPosition: number | null,
      totalPoints: number | null,
      totalKr: number,
      beers: number,
    } >,
  },
};

export interface seasonsQueryQuery {
  seasons:  Array< {
    __typename: "Season",
    id: string,
    name: string,
    closed: boolean,
    photo: string | null,
  } >,
};

export interface getAllUsersQuery {
  players:  Array< {
    __typename: "User",
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    photo: string | null,
  } >,
};
