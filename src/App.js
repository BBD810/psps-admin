import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Background from './view/components/Common/Background';
import Auth from './hoc/auth';
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
					<Route exact path='/faq' component={Auth(FaqPage, null)} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
