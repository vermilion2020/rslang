import axios, { AxiosError } from 'axios';
import { apiBaseUrl } from '../constants';

axios.defaults.baseURL = apiBaseUrl;

axios.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => {
    console.log(`err: ${error}`);
    if (error.response?.status === 502 || error.response?.status === 504) {
      console.log('Сервис недоступен');
      // TODO Add redirect to page for error handling
    }
  },
);

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default axios;
