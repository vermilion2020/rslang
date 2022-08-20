import { PagesState } from '../model/types';

const getInitialState = (): PagesState => {
  const textbook = localStorage.getItem('textbook');
  const textbookProgress = textbook ? JSON.parse(textbook) : '';
  return {
    loggedIn: false,
    page: 'main',
    refreshToken: localStorage.getItem('refreshToken') || '',
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || '',
    userName: localStorage.getItem('userName') || '',
    textbook: textbookProgress ?? {
      unit: 1,
      page: 1,
    },
  };
};

export default getInitialState;
