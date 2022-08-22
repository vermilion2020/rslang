import axios from 'axios';
import apiBaseUrl from '../constants';
import { AutenticationData, RegistrationData } from '../types';

export const regNewUser = async (data: RegistrationData) => axios.post(`${apiBaseUrl}/users`, data);

export const authUser = async (data: AutenticationData) => axios.post(`${apiBaseUrl}/signin`, data);

export const getToken = async (userId: string, token: string) => axios.get(`${apiBaseUrl}/users/${userId}/tokens`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
