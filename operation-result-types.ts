/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface LiveScoreDataInput {
  beers?: number | null;
  extraStrokes?: number | null;
  hole?: number | null;
  index?: number | null;
  par?: number | null;
  playerIds?: Array<number> | null;
  points?: number | null;
  putts?: number | null;
  strokes?: number | null;
}

export interface ScoringItemInput {
  extraStrokes: number;
  userIds: Array<string>;
}

export interface cancelRoundMutationMutationVariables {
  scoringSessionId: string;
}

export interface cancelRoundMutationMutation {
  deleteScoringSession: {
    __typename: "ScoringSession";
    // id of the season
    id: string;
  } | null;
}

export interface createLiveScoreMutationVariables {
  scoringSessionId: string;
  userId?: string | null;
  teamIndex?: number | null;
  data: LiveScoreDataInput;
}

export interface createLiveScoreMutation {
  createLiveScore: {
    __typename: "LiveScore";
    // id of the score
    id: string;
    beers: number | null;
    extraStrokes: number | null;
    hole: number | null;
    index: number | null;
    par: number | null;
    playerIds: Array<number> | null;
    points: number | null;
    putts: number | null;
    strokes: number | null;
    user: {
      __typename: "User";
      // ID
      id: string;
    } | null;
    teamIndex: number | null;
  } | null;
}

export interface finishRoundMutationMutationVariables {
  scoringSessionId: string;
}

export interface finishRoundMutationMutation {
  updateScoringSession: {
    __typename: "ScoringSession";
    // id of the season
    id: string;
  } | null;
}

export interface createScoringSessionMutationVariables {
  courseId: string;
  scorerId: string;
  teamEvent: boolean;
  scoringType: string;
  scoringItems?: Array<ScoringItemInput> | null;
  startsAt: string;
}

export interface createScoringSessionMutation {
  createScoringSession: {
    __typename: "ScoringSession";
    // id of the season
    id: string;
    course: {
      __typename: "Course";
      id: string;
      club: string;
      name: string;
    };
    scoringType: string;
    teamEvent: boolean;
  } | null;
}

export interface authenticateUserMutationVariables {
  email: string;
  password: string;
}

export interface authenticateUserMutation {
  authenticateUser: {
    __typename: "SigninPayload";
    user: {
      __typename: "User";
      // ID
      id: string;
      // The email of this user
      email: string;
      firstName: string;
      lastName: string;
      // The url to the photo of this user
      photo: string | null;
      admin: boolean;
    } | null;
    token: string | null;
  } | null;
}

export interface updateLiveScoreMutationVariables {
  id: string;
  data: LiveScoreDataInput;
}

export interface updateLiveScoreMutation {
  updateLiveScore: {
    __typename: "LiveScore";
    // id of the score
    id: string;
    extraStrokes: number | null;
    strokes: number | null;
    putts: number | null;
    points: number | null;
    beers: number | null;
  } | null;
}

export interface asQueryQuery {
  activeScoringSession: {
    __typename: "ScoringSession";
    // id of the season
    id: string;
    scoringType: string;
    teamEvent: boolean;
    course: {
      __typename: "Course";
      id: string;
      club: string;
      name: string;
    };
  } | null;
}

export interface coursesQueryQuery {
  // A lot of courses and their data
  courses: Array<{
    __typename: "Course";
    id: string;
    club: string;
    name: string;
    par: number;
    holeCount: number;
    eventCount: number;
  } | null>;
}

export interface eventQueryQueryVariables {
  eventId: string;
  seasonId: string;
}

export interface eventQueryQuery {
  // Leaderboard for a season by seasonID
  players: Array<{
    __typename: "LeaderboardUserType";
    id: string;
    photo: string | null;
    // The name of this user
    name: string;
    average: number;
    eventCount: number;
    topPoints: Array<number>;
    // position
    position: number;
    oldAverage: number | null;
    oldTotalPoints: number | null;
    prevPosition: number | null;
    totalPoints: number | null;
    totalKr: number;
    beers: number;
  }>;
  event: {
    __typename: "Event";
    // id of the event
    id: string;
    // Status of the event
    status: string;
    startsAt: string;
    scoringType: string;
    teamEvent: boolean;
    // Course
    course: {
      __typename: "Course";
      id: string;
      club: string;
      name: string;
    };
    // Leaderboard
    leaderboard: Array<{
      __typename: "EventLeaderboardUserType";
      id: string;
      photo: string | null;
      name: string;
      position: number;
      eventPoints: number;
      beers: number;
      kr: number;
      value: number;
    }>;
  };
}

export interface eventsQuery {
  // Events by seasonId
  events: Array<{
    __typename: "Event";
    // id of the event
    id: string;
    // Status of the event
    status: string;
    startsAt: string;
    scoringType: string;
    teamEvent: boolean;
    // Course
    course: {
      __typename: "Course";
      id: string;
      club: string;
      name: string;
    };
  }>;
}

export interface activeScoringSessionQueryQuery {
  activeScoringSession: {
    __typename: "ScoringSession";
    // id of the season
    id: string;
    scoringType: string;
    teamEvent: boolean;
    course: {
      __typename: "Course";
      id: string;
      club: string;
      name: string;
    };
  } | null;
  // Seasons (Only Tisdagsgolfen in this case)
  seasons: Array<{
    __typename: "Season";
    // id of the season
    id: string;
    // Name of the season
    name: string;
    // Is it closed?
    closed: boolean;
    // Url to season cover photo
    photo: string | null;
    eventCount: number;
    eventIds: Array<number> | null;
    winner: string | null;
    finalInfo: string | null;
  }>;
}

export interface seasonLeaderboardQueryVariables {
  seasonId: string;
  eventId: string;
}

export interface seasonLeaderboardQuery {
  // Leaderboard for a season by seasonID
  players: Array<{
    __typename: "LeaderboardUserType";
    id: string;
    photo: string | null;
    // The name of this user
    name: string;
    average: number;
    eventCount: number;
    topPoints: Array<number>;
    // position
    position: number;
    oldAverage: number | null;
    oldTotalPoints: number | null;
    prevPosition: number | null;
    totalPoints: number | null;
    totalKr: number;
    beers: number;
  }>;
}

export interface liveLeaderboardQueryQueryVariables {
  scoringSessionId: string;
}

export interface liveLeaderboardQueryQuery {
  // Get the logged in user and related data
  user: {
    __typename: "User";
    // ID
    id: string;
  };
  // Live Leaderboard by scoringSessionId
  liveLeaderboard: Array<{
    __typename: "LiveLeaderboardUserType";
    id: string;
    position: number;
    photo: string | null;
    // The name of this user
    name: string;
    beers: number;
    kr: number;
    points: number;
    strokes: number;
  }>;
}

export interface scoringSessionQueryVariables {
  scoringSessionId: string;
}

export interface scoringSessionQuery {
  scoringSession: {
    __typename: "ScoringSession";
    // id of the season
    id: string;
    currentHole: number;
    scoringType: string;
    teamEvent: boolean;
    course: {
      __typename: "Course";
      id: string;
      club: string;
      name: string;
      par: number;
      // Holes
      holes: Array<{
        __typename: "Hole";
        id: string;
        number: number;
        par: number;
        index: number;
      }>;
    };
    scoringItems: Array<{
      __typename: "ScoringItemType";
      extraStrokes: number;
      users: Array<{
        __typename: "User";
        // ID
        id: string;
        firstName: string;
        lastName: string;
        // The url to the photo of this user
        photo: string | null;
      }>;
    }>;
    liveScores: Array<{
      __typename: "LiveScore";
      // id of the score
      id: string;
      user: {
        __typename: "User";
        // ID
        id: string;
      } | null;
      teamIndex: number | null;
      beers: number | null;
      extraStrokes: number | null;
      hole: number | null;
      index: number | null;
      par: number | null;
      playerIds: Array<number> | null;
      points: number | null;
      putts: number | null;
      strokes: number | null;
    }> | null;
  };
}

export interface seasonsQueryQuery {
  // Seasons (Only Tisdagsgolfen in this case)
  seasons: Array<{
    __typename: "Season";
    // id of the season
    id: string;
    // Name of the season
    name: string;
    // Is it closed?
    closed: boolean;
    // Url to season cover photo
    photo: string | null;
  }>;
}

export interface getAllUsersQuery {
  // List of users
  players: Array<{
    __typename: "User";
    // ID
    id: string;
    // The email of this user
    email: string;
    firstName: string;
    lastName: string;
    // The url to the photo of this user
    photo: string | null;
  }>;
}
