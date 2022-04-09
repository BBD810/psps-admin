import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Background from './view/components/Common/Background';
// import Auth from './hoc/auth';
import LoginPage from './view/pages/LoginPage';
import BannerPage from './view/pages/BannerPage';
import SupplierPage from './view/pages/SupplierPage';
import ProductPage from './view/pages/ProductPage';
import ProductImgPage from './view/pages/ProductImgPage';
import OrderPage from './view/pages/OrderPage';
import UserPage from './view/pages/UserPage';
import FaqPage from './view/pages/FaqPage';

const App = () => {
	return (
		<BrowserRouter>
			<div id='App'>
				<Background />
				<Routes>
					{<Route path='/' element={<BannerPage />} />}
					<Route path='/login' element={<LoginPage />} />
					<Route path='/supplier' element={<SupplierPage />} />
					<Route path='/product' element={<ProductPage />} />
					<Route path='/product-img' element={<ProductImgPage />} />
					<Route path='/order' element={<OrderPage />} />
					<Route path='/user' element={<UserPage />} />
					<Route path='/faq' element={<FaqPage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
