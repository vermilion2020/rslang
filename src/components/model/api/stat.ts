import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { ResponseGameStat, ResponseStat, StatData } from '../types';

export const getDayCommonStat = async (userId: string, token: string): Promise<ResponseStat> => 
  axios.get(`${apiBaseUrl}/users/${userId}/statisticsNew/day`,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getDayGameStat = async (userId: string, token: string, game: string): Promise<ResponseGameStat> => 
  axios.get(`${apiBaseUrl}/users/${userId}/statisticsNew/day/${game}`,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const saveGameStat = async (userId: string, token: string, data: StatData): Promise<ResponseGameStat> => 
  axios.post(`${apiBaseUrl}/users/${userId}/statisticsNew`, data, {
  headers: {
    Authorization: `Bearer ${token}`,
    'content-type': 'application/json',
  },
});

export const getAllCommonStat = async (userId: string, token: string, field: string) => 
  axios.get(`${apiBaseUrl}/users/${userId}/statisticsNew/all/${field}`,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

