import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SettingContainer from 'page/preference/containers/SettingContainer';
import HotKey from '../HotKey';
import PreferenceHeader from '../PreferenceHeader';
import Update from '../Update';
import Widget from '../Widget';
import './Preference.scss';

class Preference extends React.Component {
  render() {
    return (
      <div className="Preference">
        <PreferenceHeader />
        <div className="Preference__Content">
          <Switch>
            <Route exact path="/" component={SettingContainer} />
            <Route path="/hot-key" component={HotKey} />
            <Route path="/update" component={Update} />
            <Route path="/widget" component={Widget} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Preference;
