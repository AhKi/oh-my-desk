import React from 'react';
import os from 'os';
import { NavLink } from 'react-router-dom';
import i18n from 'constants/i18n';
import './PreferenceHeader.scss';

const propTypes = {};
const defaultProps = {};

class PreferenceHeader extends React.Component {
  render() {
    const text = i18n().preference;
    return (
      <div className="PreferenceHeader">
        {os.platform() === 'darwin' && <div className="PreferenceHeader__Draggable" />}
        <NavLink
          activeClassName="PreferenceHeader__Link--select"
          className="PreferenceHeader__Link"
          exact
          to="/"
        >
          {text.main}
        </NavLink>
        <NavLink
          activeClassName="PreferenceHeader__Link--select"
          className="PreferenceHeader__Link"
          to="/update"
        >
          {text.update}
        </NavLink>
        <NavLink
          activeClassName="PreferenceHeader__Link--select"
          className="PreferenceHeader__Link"
          to="/hot-key"
        >
          {text.hotKey}
        </NavLink>
        <NavLink
          activeClassName="PreferenceHeader__Link--select"
          className="PreferenceHeader__Link"
          to="/widget"
        >
          {text.widget}
        </NavLink>
      </div>
    );
  }
}

PreferenceHeader.propTypes = propTypes;
PreferenceHeader.defaultProps = defaultProps;

export default PreferenceHeader;
