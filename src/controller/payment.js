import axios from 'axios';
import { ADDRESS } from '../config';

const instance = axios.create({
	proxy: `${ADDRESS}`,
	baseURL: '/payment',
	// baseURL: `${ADDRESS}/payment`,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const get_list = async (from, to, process, page) => {
	return await instance
		.get(`/list/?from=${from}&to=${to}&process=${process}&page=${page}`)
		.catch(errorMessage);
};

export const get_detail = async (payment_uid) => {
	return await instance.get(`/detail/${payment_uid}`).catch(errorMessage);
};

export const get_user_order_list = async (user_id) => {
	return await instance.get(`/user/${user_id}`).catch(errorMessage);
};
