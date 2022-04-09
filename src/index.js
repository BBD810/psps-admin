import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './modules';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import GlobalFonts from './styles/GlobalFonts';

const store = createStore(rootReducer);

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<GlobalStyle />
			<GlobalFonts />
			<App />
		</Provider>
	</ThemeProvider>,
	document.getElementById('root')
);
