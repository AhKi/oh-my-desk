import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SettingContainer from 'page/preference/containers/SettingContainer';
import ModalContainer from 'page/preference/containers/ModalContainer';
import UpdateContainer from 'page/preference/containers/UpdateContainer';
import HotKey from '../HotKey';
import PreferenceHeader from '../PreferenceHeader';
import Widget from '../Widget';
import './Preference.scss';

class Preference extends React.Component {
  render() {
    return (
      <div className="Preference">
        <ModalContainer />
        <PreferenceHeader />
        <div className="Preference__Content">
          <Switch>
            <Route exact path="/" component={SettingContainer} />
            <Route path="/update" component={UpdateContainer} />
            <Route path="/hot-key" component={HotKey} />
            <Route path="/widget" component={Widget} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Preference;
