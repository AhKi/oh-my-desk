import React from 'react';
import Svg from 'react-svg-inline';
import { NavLink } from 'react-router-dom';
import omdIcon from 'assets/search-view_icon/icon_omdLogo.svg';
import './PreferenceHeader.scss';

const propTypes = {};
const defaultProps = {};

class PreferenceHeader extends React.Component {
  render() {
    return (
      <div className="PreferenceHeader">
        <div className="PreferenceHeader__nav">
          <NavLink
            activeClassName="PreferenceHeader__Link--select"
            className="PreferenceHeader__Link"
            exact
            to="/"
          >
            <Svg className="PreferenceHeader__icon" svg={omdIcon} />
          </NavLink>
        </div>
      </div>
    );
  }
}

PreferenceHeader.propTypes = propTypes;
PreferenceHeader.defaultProps = defaultProps;

export default PreferenceHeader;
