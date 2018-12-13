export interface CurrentUser {
  id: string;
  token: string;
}

export interface ScoringSession {
  id: string;
  scoringType: string;
  teamEvent: boolean;
  course: Course;
}

export interface Course {
  id: string;
  club: string;
  name: string;
  eventCount: number;
  par: number;
  holeCount: number;
}

export interface Season {
  id: string;
  name: string;
  closed: boolean;
  photo: string | null;
  eventCount: number;
  eventIds: [number] | null;
  winner: string | null;
  finalInfo: string | null;
}
