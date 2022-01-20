import axios from 'axios';
import { ADDRESS } from '../config';

const instance = axios.create({
	proxy: `${ADDRESS}`,
	baseURL: '/product_option',
	// baseURL: `${ADDRESS}/product_option`,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const create = async (data, product_id) => {
	return await instance.post(`/${product_id}`, data).catch(errorMessage);
};
