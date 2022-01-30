import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Background from './components/Background';
import Auth from './hoc/auth';
import LoginPage from './pages/LoginPage';
import BannerPage from './pages/BannerPage';
import SupplierPage from './pages/SupplierPage';
import ProductPage from './pages/ProductPage';
import ProductImgPage from './pages/ProductImgPage';
import OrderPage from './pages/OrderPage';
import UserPage from './pages/UserPage';

const App = () => {
	return (
		<Router>
			<div id='App'>
				<Background />
				<Switch>
					<Route exact path='/' component={Auth(BannerPage, true)} />
					<Route exact path='/login' component={Auth(LoginPage, false)} />
					<Route
						exact
						path='/supplier'
						component={Auth(SupplierPage, true)}
					/>
					<Route
						exact
						path='/product'
						component={Auth(ProductPage, true)}
					/>
					<Route
						exact
						path='/product-img'
						component={Auth(ProductImgPage, true)}
					/>
					<Route exact path='/order' component={Auth(OrderPage, true)} />
					<Route exact path='/user' component={Auth(UserPage, true)} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
