export interface PagesState {
  page: string;
  loggedIn: boolean;
  token: string;
  refreshToken: string;
  userId: string;
  userName: string;
}

export interface Page {
  state: PagesState;
  render: () => Promise<PagesState>;
}
