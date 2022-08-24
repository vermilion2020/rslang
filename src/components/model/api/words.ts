import axios from 'axios';
import apiBaseUrl from '../constants';

const getWords = async (group: number, page: number) => axios.get(`${apiBaseUrl}/words?group=${group}&page=${page}`);
export default getWords;
