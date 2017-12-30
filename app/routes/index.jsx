import React from 'react';
import { Switch, Route } from 'react-router';
import CounterContainer from 'containers/CounterContainer';
import RootPage from 'components/RootPage';
import App from '../app';

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