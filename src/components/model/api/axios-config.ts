import axios, { AxiosError } from 'axios';
import { clearLocalStorage } from '../../controller/helpers';
import { apiBaseUrl } from '../constants';

axios.defaults.baseURL = apiBaseUrl;

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error: AxiosError) {
  console.log('err: '+ error);
  if (error.response?.status === 403) 
  {
    clearLocalStorage();
  }
});

export default axios;