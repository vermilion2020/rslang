export interface Progress {
  unit: number;
  page: number;
}

export type GameInitial = Progress & { source: string; set?: boolean };

export interface PagesState {
  page: string;
  loggedIn: boolean;
  token: string;
  expire: number;
  refreshToken: string;
  userId: string;
  userName: string;
  textbook: Progress;
  sprint: GameInitial;
  audio: GameInitial;
  dictionary: Progress;
  gameStarted?: boolean;
}

export interface Page {
  state: PagesState;
  render: () => Promise<PagesState>;
}
