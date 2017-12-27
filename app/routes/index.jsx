import React from 'react';
import { Switch, Route } from 'react-router';
import App from '../app';
import CounterContainer from 'containers/CounterContainer';
import RootPage from 'components/RootPage';

function routes() {
	return (
		<App>
			<Switch>
				<Route path="/counter" component={CounterContainer} />
				<Route path="/" component={RootPage} />
			</Switch>
		</App>
	);
}

export default routes;