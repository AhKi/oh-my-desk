import React from 'react';
// import PropTypes from 'prop-types';
import icon from 'assets/logo/logo-white.svg';
import addIcon from 'assets/icon/icon-widget-refresh.svg';
import allIcon from 'assets/icon/icon-menu-store.svg';
import favoritesIcon from 'assets/icon/icon-pin.svg';
import settingIcon from 'assets/icon/icon-menu-setting.svg';
import i18n from 'constants/i18n';
import './SearchMenu.scss';

const propTypes = {};
const defaultProps = {};

class SearchMenu extends React.Component {
  render() {
    const text = i18n().search;

    return (
      <div className="SearchMenu">
        <img
          className="SearchMenu__Logo"
          src={icon}
          alt="Oh-My-Desk-Logo"
        />
        <ul className="SearchMenu__List">
          <li className="SearchMenu__Item">
            <button
              className="SearchMenu__Btn"
              type="button"
            >
              <img
                className="SearchMenu__Icon"
                src={addIcon}
                alt=""
              />
              {text.newWidget}
            </button>
          </li>
          <li className="SearchMenu__Item">
            <button
              className="SearchMenu__Btn"
              type="button"
            >
              <img
                className="SearchMenu__Icon"
                src={allIcon}
                alt=""
              />
              {text.all}
            </button>
          </li>
          <li className="SearchMenu__Item">
            <button
              className="SearchMenu__Btn"
              type="button"
            >
              <img
                className="SearchMenu__Icon"
                src={favoritesIcon}
                alt=""
              />
              {text.favorites}
            </button>
          </li>
          <li className="SearchMenu__Item">
            <button
              className="SearchMenu__Btn"
              type="button"
            >
              <img
                className="SearchMenu__Icon"
                src={settingIcon}
                alt=""
              />
              {text.setting}
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

SearchMenu.propTypes = propTypes;
SearchMenu.defaultProps = defaultProps;

export default SearchMenu;
