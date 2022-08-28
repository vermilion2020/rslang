export interface Progress {
  unit: number;
  page: number;
}

export interface PagesState {
  page: string;
  loggedIn: boolean;
  token: string;
  expire: number;
  refreshToken: string;
  userId: string;
  userName: string;
  textbook: Progress;
  dictionary: Progress;
}

export interface Page {
  state: PagesState;
  render: () => Promise<PagesState>;
}
