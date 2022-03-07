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

export const edit = async (data, product_option_id) => {
	return await instance.put(`/${product_option_id}`, data).catch(errorMessage);
};

export const remove = async (product_option_id) => {
	return await instance.delete(`/${product_option_id}`).catch(errorMessage);
};

export const change_display = async (product_option_id) => {
	return await instance
		.patch(`/display/${product_option_id}`)
		.catch(errorMessage);
};

export const change_stock = async (product_option_id) => {
	return await instance
		.patch(`/stock/${product_option_id}`)
		.catch(errorMessage);
};

export const change_order = async (arr) => {
	return await instance.patch(`/order`, arr).catch(errorMessage);
};
