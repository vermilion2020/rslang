import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { UserWord } from '../types';

export const getWords = async (group: number, page: number) =>
  axios.get(`${apiBaseUrl}/words?group=${group}&page=${page}`);

export const getWordTranslates = async (wordId: string, countTranslates: number) =>
  axios.get(`${apiBaseUrl}/words/${wordId}/${countTranslates}`);

export const getUserWord = async (userId: string, wordId: string, token: string) =>
  axios.get(`${apiBaseUrl}/users/${userId}/words/${wordId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getUserWords = async (userId: string, token: string) =>
  axios.get(`${apiBaseUrl}/users/${userId}/words`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getWordsHard = async (userId: string, token: string) =>
  axios.get(`${apiBaseUrl}/users/${userId}/aggregatedWords?filter={"userWord.difficulty":"hard"}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addUserWord = async (userId: string, wordId: string, data: UserWord, token: string) =>
  axios.post(`${apiBaseUrl}/users/${userId}/words/${wordId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  });

export const updateUserWord = async (userId: string, wordId: string, data: UserWord, token: string) =>
  axios.put(`${apiBaseUrl}/users/${userId}/words/${wordId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
  });

export const checkData = async (userId: string, token: string, unit: number, page: number) =>
  axios.get(
    `${apiBaseUrl}/users/${userId}/aggregatedWords/pages/${page}?filter={"$or":[{"userWord.difficulty":"easy"},{"userWord.difficulty":"hard"}]}&group=${unit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
