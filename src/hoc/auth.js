import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../modules/admin';
import * as auth from '../controller/auth';

const Auth = (SpecificComponent, option, adminRoute = null) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const AuthenticationCheck = () => {
		useEffect(() => {
			auth.authCheck().then((res) => {
				res.data.success ? dispatch(adminLogin()) : navigate('/login');
			});
			// eslint-disable-next-line
		}, []);

		return <SpecificComponent />;
	};

	return AuthenticationCheck;
};

// export default Auth;

export default Auth;
