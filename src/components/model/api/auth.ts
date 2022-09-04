import axios from './axios-config';
import { AutenticationData, RegistrationData } from '../types';

export const regNewUser = async (data: RegistrationData) => axios.post(`/users`, data);

export const authUser = async (data: AutenticationData) => axios.post(`/signin`, data);

export const getToken = async (userId: string, token: string) => axios.get(`/users/${userId}/tokens`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
