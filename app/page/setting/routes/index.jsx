import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import SettingContainer from 'setting/containers/SettingContainer';
import WidgetListContainer from 'setting/containers/WidgetListContainer';
import WidgetSettingContainer from 'setting/containers/WidgetSettingContainer';
import App from '../app';

function routes() {
  return (
    <App>
      <Switch>
        <Route path="/widget-list" component={WidgetListContainer} />
        <Route path="/widget-setting" component={WidgetSettingContainer} />
        <Route path="/setting" component={SettingContainer} />
        <Redirect to="/widget-list" from="/" />
      </Switch>
    </App>
  );
}

export default routes;
