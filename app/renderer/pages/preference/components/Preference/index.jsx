import React from 'react';
import SettingContainer from 'renderer/pages/preference/containers/SettingContainer';
import ModalContainer from 'renderer/components/Modal/ModalContainer';
import PreferenceHeader from '../PreferenceHeader';
import './Preference.scss';

class Preference extends React.Component {
  render() {
    return (
      <div className="Preference">
        <ModalContainer />
        <PreferenceHeader />
        <div className="Preference__Content">
          <SettingContainer />
        </div>
      </div>
    );
  }
}

export default Preference;
