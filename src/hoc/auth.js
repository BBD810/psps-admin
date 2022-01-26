import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { admin_login } from '../modules/admin';
import * as auth from '../controller/auth';

const Auth = (SpecificComponent, option, adminRoute = null) => {
	const dispatch = useDispatch();

	const AuthenticationCheck = ({ history }) => {
		useEffect(() => {
			auth.authCheck().then((res) => {
				res.data.success ? dispatch(admin_login()) : history.push('/login');
			});
			// eslint-disable-next-line
		}, []);

		return <SpecificComponent />;
	};

	return AuthenticationCheck;
};

export default Auth;
