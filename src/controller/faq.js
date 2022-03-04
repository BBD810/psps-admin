import axios from 'axios';
import { ADDRESS } from '../config';

const instance = axios.create({
	proxy: `${ADDRESS}`,
	baseURL: '/question',
	// baseURL: `${ADDRESS}/question`,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const create = async (data) => {
	console.log('create data', data);
	return await instance.post('/', data).catch(errorMessage);
};

export const edit = async (qu_id, data) => {
	return await instance.put(`${qu_id}`, data).catch(errorMessage);
};

export const get_list = async (qu_type_id) => {
	return await instance.get(`/list/${qu_type_id}`).catch(errorMessage);
};
