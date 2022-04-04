import axios from 'axios';
import { MODE, ADDRESS } from '../config';

const url =
	MODE === 'development'
		? { proxy: `${ADDRESS}`, baseURL: '/product_image' }
		: { baseURL: `${ADDRESS}/product_image` };

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
	return await instance.delete(`/?product_image_id=${id}`).catch(errorMessage);
};

export const edit = async (data, id, contain) => {
	if (contain) {
		return await instance
			.put(`/?product_image_id=${id}&containImg=true`, data)
			.catch(errorMessage);
	} else {
		return await instance
			.put(`/?product_image_id=${id}&containImg=false`, data)
			.catch(errorMessage);
	}
};

export const getList = async () => {
	return await instance.get('/').catch(errorMessage);
};

export const getDetail = async (id) => {
	return await instance
		.get(`/detail/?product_image_id=${id}`)
		.catch(errorMessage);
};

export const getShareList = async (boolean) => {
	return await instance.get(`/?share=${boolean}`).catch(errorMessage);
};

// 단일이미지이고 상품에 아직 사용되지 않은 이미지 리스트
export const getUnusedSingleList = async () => {
	return await instance.get(`/unused`).catch(errorMessage);
};

export const changeShare = async (id) => {
	return await instance
		.patch(`/share/?product_image_id=${id}`)
		.catch(errorMessage);
};

export const replaceShare = async (arr) => {
	return await instance.post(`/replace`, arr).catch(errorMessage);
};

export const changeOrder = async (arr, view) => {
	return await instance
		.patch(`/order/?share=${view}`, arr)
		.catch(errorMessage);
};
