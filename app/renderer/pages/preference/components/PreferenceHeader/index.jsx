import React from 'react';
import os from 'os';
import { NavLink } from 'react-router-dom';
import omdIcon from 'assets/oh-my-desk-icon.png';
import './PreferenceHeader.scss';

const propTypes = {};
const defaultProps = {};

class PreferenceHeader extends React.Component {
  render() {
    return (
      <div className="PreferenceHeader">
        {os.platform() === 'darwin' && <div className="PreferenceHeader__Draggable" />}
        <div className="PreferenceHeader__nav">
          <NavLink
            activeClassName="PreferenceHeader__Link--select"
            className="PreferenceHeader__Link"
            exact
            to="/"
          >
            <img className="PreferenceHeader__icon" src={omdIcon} alt="" />
          </NavLink>
        </div>
      </div>
    );
  }
}

PreferenceHeader.propTypes = propTypes;
PreferenceHeader.defaultProps = defaultProps;

export default PreferenceHeader;
