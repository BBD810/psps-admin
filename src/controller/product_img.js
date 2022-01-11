import axios from 'axios';
import { ADDRESS } from '../config';

const instance = axios.create({
	// proxy: `${ADDRESS}`,
	// baseURL: '/product_image',
	baseURL: `${ADDRESS}/product_image`,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const create = async (data) => {
	return await instance.post('/', data).catch(errorMessage);
};

export const get_list = async () => {
	return await instance.get('/').catch(errorMessage);
};
export const get_detail = async (product_image_id) => {
	return await instance
		.get(`/detail/?product_image_id=${product_image_id}`)
		.catch(errorMessage);
};
