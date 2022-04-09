import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from './modules/admin';
import * as auth from './controller/auth';
import Background from './view/components/Common/Background';
import LoginPage from './view/pages/LoginPage';
import BannerPage from './view/pages/BannerPage';
import SupplierPage from './view/pages/SupplierPage';
import ProductPage from './view/pages/ProductPage';
import ProductImgPage from './view/pages/ProductImgPage';
import OrderPage from './view/pages/OrderPage';
import UserPage from './view/pages/UserPage';
import FaqPage from './view/pages/FaqPage';

const App = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuthorized = useSelector((state) => state.admin.login);

	useEffect(() => {
		auth.authCheck().then((res) => {
			res.data.success ? dispatch(adminLogin()) : navigate('login');
		});
		// eslint-disable-next-line
	}, [isAuthorized]);

	return (
		<div id='App'>
			<Background />
			<Routes>
				<Route path='/' element={<BannerPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/supplier' element={<SupplierPage />} />
				<Route path='/product' element={<ProductPage />} />
				<Route path='/product-img' element={<ProductImgPage />} />
				<Route path='/order' element={<OrderPage />} />
				<Route path='/user' element={<UserPage />} />
				<Route path='/faq' element={<FaqPage />} />
			</Routes>
		</div>
	);
};

export default App;
