import axios from 'axios';
import apiBaseUrl from '../constants';

export const getWords = async (group: number, page: number) => axios.get(`${apiBaseUrl}/words?group=${group}&page=${page}`);

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

export const getWordsHard = async (userId: string, token: string) => axios.get(`${apiBaseUrl}/users/${userId}/aggregatedWords?filter={"userWord.difficulty":"hard"}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
