import axios from 'axios';
import { ADDRESS } from '../config';

const instance = axios.create({
	// proxy: `${ADDRESS}`,
	// baseURL: '/auth',
	baseURL: `${ADDRESS}/auth`,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const login = async (userData) => {
	return await instance.post('/', userData).catch(errorMessage);
};

export const logout = async () => {
	return await instance.get('/logout').catch(errorMessage);
};

export const authCheck = async () => {
	return await instance.get('/').catch(errorMessage);
};
