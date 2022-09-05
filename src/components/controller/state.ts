import { PagesState } from '../model/types/page';

const getInitialState = (): PagesState => {
  const textbook = localStorage.getItem('textbook');
  const dictionary = localStorage.getItem('dictionary');
  const textbookProgress = textbook ? JSON.parse(textbook) : '';
  const dictionaryProgress = dictionary ? JSON.parse(dictionary) : '';
  return {
    loggedIn: false,
    page: 'main',
    refreshToken: localStorage.getItem('refreshToken') || '',
    expire: Number(localStorage.getItem('expire')) || 0,
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || '',
    userName: localStorage.getItem('userName') || '',
    textbook: textbookProgress ?? {
      unit: 1,
      page: 1,
    },
    sprint: {
      unit: -1,
      page: -1,
      source: '',
    },
    audio: {
      unit: -1,
      page: -1,
      source: '',
      set: false,
    },
    dictionary: dictionaryProgress ?? {
      unit: 1,
      page: 1,
    },
  };
};

export default getInitialState;
