import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { ResponseGameStat, ResponseStat } from '../types';

export const getDayCommonStat = async (userId: string, token: string): Promise<ResponseStat> => axios.get(`${apiBaseUrl}/users/${userId}/statisticsNew/day`,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getDayGameStat = async (userId: string, token: string, game: string): Promise<ResponseGameStat> => axios.get(`${apiBaseUrl}/users/${userId}/statisticsNew/day/${game}`,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

