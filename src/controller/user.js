import axios from 'axios';
import { MODE, ADDRESS } from '../config';

const url =
	MODE === 'development'
		? { proxy: `${ADDRESS}`, baseURL: '/user' }
		: { baseURL: `${ADDRESS}/user` };

const instance = axios.create({
	...url,
	withCredentials: true,
});

const errorMessage = () => {
	window.alert('서버가 응답하지 않습니다. 잠시 후 다시 시도해주세요.');
	return new Error('Server Error');
};

export const get_list = async (page, name, phone_number) => {
	return await instance
		.get(`/list/?page=${page}&name=${name}&phone_number=${phone_number}`)
		.catch(errorMessage);
};
