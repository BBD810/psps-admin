import axios from 'axios';
import { MODE, ADDRESS } from '../config';

const url =
	MODE === 'development'
		? { proxy: `${ADDRESS}`, baseURL: '/payment' }
		: { baseURL: `${ADDRESS}/payment` };

const instance = axios.create({
	...url,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const getList = async (from, to, process, page) => {
	return await instance
		.get(`/list/?from=${from}&to=${to}&process=${process}&page=${page}`)
		.catch(errorMessage);
};

export const getDetail = async (payment_uid) => {
	return await instance.get(`/detail/${payment_uid}`).catch(errorMessage);
};

export const getUserOrderList = async (user_id, page) => {
	return await instance
		.get(`/user/${user_id}/?page=${page}`)
		.catch(errorMessage);
};

export const enterTrackingNumber = async (data) => {
	return await instance.patch(`/delivery`, data).catch(errorMessage);
};

export const claimHandling = async (data) => {
	return await instance.patch(`/refund`, data).catch(errorMessage);
};

export const claimRefuse = async (data) => {
	return await instance.patch(`/refuse`, data).catch(errorMessage);
};
