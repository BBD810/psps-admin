const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const admin_login = () => ({ type: LOGIN });
export const admin_logout = () => ({ type: LOGOUT });

const loginInitialState = { login: false, name: '' };

export const admin = (state = loginInitialState, action) => {
	switch (action.type) {
		case LOGIN:
			return { login: true };
		case LOGOUT:
			return loginInitialState;
		default:
			return state;
	}
};
