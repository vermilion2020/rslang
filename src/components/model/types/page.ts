export interface Page {
  state: PagesState;
  render: () => Promise<PagesState>;
}

export interface PagesState {
  page: string,
}