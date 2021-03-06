import axios from 'axios';
import { MODE, ADDRESS } from '../config';

const url =
	MODE === 'development'
		? { proxy: `${ADDRESS}`, baseURL: '/supplier' }
		: { baseURL: `${ADDRESS}/supplier` };

const instance = axios.create({
	...url,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const create = async (data, page) => {
	return await instance.post(`/?page=${page}`, data).catch(errorMessage);
};

export const edit = async (data, supplier_id, page) => {
	return await instance
		.put(`/${supplier_id}/?page=${page}`, data)
		.catch(errorMessage);
};

export const remove = async (supplier_id, page) => {
	return await instance
		.delete(`/${supplier_id}/?page=${page}`)
		.catch(errorMessage);
};

export const getList = async (page) => {
	return await instance.get(`/?page=${page}`).catch(errorMessage);
};
