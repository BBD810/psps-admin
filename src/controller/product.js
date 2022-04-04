import axios from 'axios';
import { MODE, ADDRESS } from '../config';

const url =
	MODE === 'development'
		? { proxy: `${ADDRESS}`, baseURL: '/product' }
		: { baseURL: `${ADDRESS}/product` };

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
	return await instance.delete(`/${id}`).catch(errorMessage);
};

export const edit = async (id, data) => {
	return await instance.put(`/${id}`, data).catch(errorMessage);
};

export const getList = async (part, subPart) => {
	return await instance.get(`/list/${part}/${subPart}`).catch(errorMessage);
};

export const getRecommendList = async () => {
	return await instance.get(`/recommend`).catch(errorMessage);
};

export const getDetail = async (id) => {
	return await instance.get(`/detail/${id}`).catch(errorMessage);
};

export const changeDisplay = async (id) => {
	return await instance.patch(`/display/${id}`).catch(errorMessage);
};

export const changeRecommend = async (id) => {
	return await instance.patch(`/recommend/${id}`).catch(errorMessage);
};

export const changeOrder = async (arr, boolean) => {
	return await instance
		.patch(`/order/?isRecommend=${boolean}`, arr)
		.catch(errorMessage);
};

export const changeAllSoldOut = async (product_id) => {
	return await instance.patch(`/stock/${product_id}`).catch(errorMessage);
};
