const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const admin_login = (payload) => ({ type: LOGIN, data: payload });
export const admin_logout = () => ({ type: LOGOUT });

const loginInitialState = { login: false, name: '' };

export const admin = (state = loginInitialState, action) => {
	switch (action.type) {
		case LOGIN:
			return { login: true, name: action.data };
		case LOGOUT:
			return loginInitialState;
		default:
			return state;
	}
};
