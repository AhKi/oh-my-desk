import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import SettingContainer from 'containers/SettingContainer';
import RootPage from 'components/RootPage';
import WidgetList from 'components/WidgetList';
import WidgetStore from 'components/WidgetStore';
import App from '../app';

function routes() {
	return (
		<App>
			<Switch>
				<Route exact path="/" component={RootPage} />
				<Route path="/setting" component={SettingContainer} />
				<Route path="/widget-list" component={WidgetList} />
				<Route path="/widget-store" component={WidgetStore} />
				<Redirect to="/setting" from="/" />
			</Switch>
		</App>
	);
}

export default routes;