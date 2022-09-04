import axios, { AxiosError } from 'axios';
import { clearLocalStorage } from '../../controller/helpers';
import { apiBaseUrl } from '../constants';

axios.defaults.baseURL = apiBaseUrl;

axios.interceptors.request.use(function (config) {
  return config;
}, function (error: AxiosError) {
  console.log('err: '+ error);
  if (error.response?.status === 502 || error.response?.status === 504) 
  {
    console.log('Сервис недоступен');
    // TODO Add redirect to page for error handling
  }
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error: AxiosError) {
  if (error.response?.status === 401) 
  {
    clearLocalStorage();
    window.location.href = '/';
  }
  return Promise.reject(error);
});

export default axios;