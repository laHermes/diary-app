import { transformEntryDate } from '@utils/dates';
import axios from 'axios';

// Entries APIs
export const fetchEntries = async (): Promise<any> => {
	const response = await axios.get('/api/entries');
	return transformEntryDate(response.data);
};
export const fetchInspiration = async (): Promise<any> => {
	const response = await axios.get('/api/daily-inspiration');
	return response.data;
};

export const createEntryMutation = (entry: IEntry) => {
	return axios.post('/api/entries', entry);
};
export const updateEntryMutation = (entry: IEntry) => {
	return axios.put('/api/entries', entry);
};
export const deleteEntryMutation = (entryId: IEntry['id']) => {
	return axios.delete('/api/entries', { data: { id: entryId } });
};

// User API
export const deleteUserMutation = () => {
	return axios.delete('/api/user-delete');
};
