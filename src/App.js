import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Background from './components/Background/Background';
import Auth from './hoc/auth';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const App = () => {
	return (
		<Router>
			<div id='App'>
				<Background />
				<Switch>
					<Route exact path='/' component={Auth(HomePage, true)} />
					<Route exact path='/login' component={Auth(LoginPage, false)} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
