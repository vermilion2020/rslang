import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { AutenticationData, RegistrationData, SignInResponse } from '../types';

export const regNewUser = async (data: RegistrationData) => {
  return await axios.post(`${apiBaseUrl}/users`, data);
}

export const authUser = async (data: AutenticationData) => {
  return await axios.post(`${apiBaseUrl}/signin`, data);
}

export const getToken = async (userId: string, token: string) => {
  return await  axios.get(`${apiBaseUrl}/users/${userId}/tokens`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}