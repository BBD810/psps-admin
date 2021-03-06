import axios from 'axios';
import { MODE, ADDRESS } from '../config';

const url =
	MODE === 'development'
		? { proxy: `${ADDRESS}`, baseURL: '/banner' }
		: { baseURL: `${ADDRESS}/banner` };

const instance = axios.create({
	...url,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const create = async (data) => {
	return await instance.post('/', data).catch(errorMessage);
};

export const remove = async (id) => {
	return await instance.delete(`/?banner_id=${id}`).catch(errorMessage);
};

export const edit = async (data, id) => {
	return await instance.put(`/?banner_id=${id}`, data).catch(errorMessage);
};

export const getList = async (type) => {
	return await instance.get(`/?type=${type}`).catch(errorMessage);
};

export const getDisplayList = async (type, boolean) => {
	return await instance
		.get(`/?type=${type}&display=${boolean}`)
		.catch(errorMessage);
};

export const getDetail = async (id) => {
	return await instance.get(`/detail/?banner_id=${id}`).catch(errorMessage);
};

export const changeDisplay = async (id) => {
	return await instance.get(`/display/?banner_id=${id}`).catch(errorMessage);
};

export const changeOrder = async (arr) => {
	return await instance.patch('/order', arr).catch(errorMessage);
};

export const replaceDisplay = async (arr) => {
	return await instance.patch('/display', arr).catch(errorMessage);
};
