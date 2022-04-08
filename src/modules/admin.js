const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const adminLogin = () => ({ type: LOGIN });
export const adminLogout = () => ({ type: LOGOUT });

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
