import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { AutenticationData, RegistrationData } from '../types';

export const regNewUser = async (data: RegistrationData) => {
  return await axios.post(`${apiBaseUrl}/users`, data);
}

export const authUser = async (data: AutenticationData) => {
  return await axios.post(`${apiBaseUrl}/signin`, data);
}