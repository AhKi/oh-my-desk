import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CounterContainers from 'containers/CounterContainer';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<CounterContainers />
	</Provider>,
	document.getElementById('root'),
);
