import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Background from './components/Background';
import Auth from './hoc/auth';
import BannerPage from './pages/BannerPage';
import LoginPage from './pages/LoginPage';
import SupplierPage from './pages/SupplierPage';

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
				</Switch>
			</div>
		</Router>
	);
};

export default App;
