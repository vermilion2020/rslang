import axios from 'axios';
import { apiBaseUrl } from '../constants';

export const getWords = async (group: number, page: number) => axios.get(`${apiBaseUrl}/words?group=${group}&page=${page}`);

export const getWordTranslates = async (wordId: string, countTranslates: number) => axios.get(`${apiBaseUrl}/words/${wordId}/${countTranslates}`);

export const getUserWord = async (userId: string, wordId: string, token: string) => axios.get(`${apiBaseUrl}/users/${userId}/words/${wordId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getUserWords = async (userId: string, token: string) => axios.get(`${apiBaseUrl}/users/${userId}/words`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
