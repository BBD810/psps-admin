import axios from 'axios';
import { ADDRESS } from '../config';

const instance = axios.create({
	// proxy: `${ADDRESS}`,
	// baseURL: '/product',
	baseURL: `${ADDRESS}/product`,
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
	return await instance.delete(`/${id}`).catch(errorMessage);
};

export const edit = async (id, data) => {
	return await instance.put(`/${id}`, data).catch(errorMessage);
};

export const get_list = async (part, subPart) => {
	return await instance.get(`/list/${part}/${subPart}`).catch(errorMessage);
};

export const get_recommend_list = async () => {
	return await instance.get(`/recommend`).catch(errorMessage);
};

export const get_detail = async (id) => {
	return await instance.get(`/detail/${id}`).catch(errorMessage);
};

export const change_display = async (id) => {
	return await instance.patch(`/display/${id}`).catch(errorMessage);
};

export const change_recommend = async (id) => {
	return await instance.patch(`/recommend/${id}`).catch(errorMessage);
};

export const change_order = async (arr, boolean) => {
	return await instance
		.patch(`/order/?isRecommend=${boolean}`, arr)
		.catch(errorMessage);
};

export const change_all_sold_out = async (product_id) => {
	return await instance.patch(`/stock/${product_id}`).catch(errorMessage);
};
