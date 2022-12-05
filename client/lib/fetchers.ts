import { BASE_URL } from '@config/index';
import axios from 'axios';

export const fetchInspiration = () => {
	return axios.get('https://api.quotable.io/random');
};

export const fetchDailyInspiration = () => {
	return axios.get(`${BASE_URL}/api/daily-inspiration`);
};
