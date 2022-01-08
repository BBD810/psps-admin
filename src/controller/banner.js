import axios from 'axios';
import { ADDRESS } from '../config';

const instance = axios.create({
	// proxy: `${ADDRESS}`,
	// baseURL: '/banner',
	baseURL: `${ADDRESS}/banner`,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const create = async (data) => {
	return await instance.post('/', data).catch(errorMessage);
};

export const remove = async (banner_id) => {
	return await instance.delete(`/?banner_id=${banner_id}`).catch(errorMessage);
};

export const edit = async (data, banner_id, contain) => {
	if (contain) {
		return await instance
			.put(`/?banner_id=${banner_id}&containImg=true`, data)
			.catch(errorMessage);
	} else {
		return await instance
			.put(`/?banner_id=${banner_id}&containImg=false`, data)
			.catch(errorMessage);
	}
};

export const get_list = async (type) => {
	return await instance.get(`/?type=${type}`).catch(errorMessage);
};

export const get_display_list = async (type, boolean) => {
	return await instance
		.get(`/?type=${type}&display=${boolean}`)
		.catch(errorMessage);
};

export const change_display = async (banner_id) => {
	return await instance
		.get(`/display/?banner_id=${banner_id}`)
		.catch(errorMessage);
};

export const change_order = async (arr) => {
	return await instance.patch('/order', arr).catch(errorMessage);
};

export const replace_display = async (arr) => {
	return await instance.patch('/display', arr).catch(errorMessage);
};

export const get_detail = async (banner_id) => {
	return await instance
		.get(`/detail/?banner_id=${banner_id}`)
		.catch(errorMessage);
};
