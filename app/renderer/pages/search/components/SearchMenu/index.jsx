import React from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';
import cx from 'classnames';
import icon from 'assets/oh-my-desk-icon.png';
import addIcon from 'assets/icon/icon-plus-white.svg';
import allIcon from 'assets/icon/icon-desktop-white.svg';
import favoritesIcon from 'assets/icon/icon-border-star-white.svg';
import outIcon from 'assets/icon/icon-out.svg';
import settingIcon from 'assets/icon/icon-menu-setting.svg';
import i18n from 'constants/i18n';
import './SearchMenu.scss';

const propTypes = {
  filter: PropTypes.string,
  onMakeWidgetRequest: PropTypes.func,
  onQuitApp: PropTypes.func,
  onSetFilter: PropTypes.func,
};
const defaultProps = {
  filter: 'ALL',
  onMakeWidgetRequest() {},
  onQuitApp() {},
  onSetFilter() {},
};

class SearchMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetAllFilter = this.handleSetAllFilter.bind(this);
    this.handleSetFavoritesFilter = this.handleSetFavoritesFilter.bind(this);
    this.handleMakeWidgetRequest = this.handleMakeWidgetRequest.bind(this);
  }

  handleMakeWidgetRequest() {
    const { onMakeWidgetRequest } = this.props;

    onMakeWidgetRequest();
  }

  handleSetAllFilter() {
    const { filter, onSetFilter } = this.props;

    if (filter !== 'ALL') {
      onSetFilter('ALL');
    }
  }

  handleSetFavoritesFilter() {
    const { filter, onSetFilter } = this.props;

    if (filter !== 'FAVORITES') {
      onSetFilter('FAVORITES');
    }
  }

  render() {
    const text = i18n().search;
    const { filter, onQuitApp } = this.props;
    const allMenuClassName = cx('SearchMenu__Btn', {
      'SearchMenu__Btn--active': filter === 'ALL',
    });
    const favoritesMenuClassName = cx('SearchMenu__Btn', {
      'SearchMenu__Btn--active': filter === 'FAVORITES',
    });

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
              data-test-id="menu-new-widget"
              type="button"
              onClick={this.handleMakeWidgetRequest}
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
              className={allMenuClassName}
              data-test-id="menu-all"
              type="button"
              onClick={this.handleSetAllFilter}
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
              className={favoritesMenuClassName}
              data-test-id="menu-favorites"
              type="button"
              onClick={this.handleSetFavoritesFilter}
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
              data-test-id="menu-setting"
              type="button"
              onClick={() => ipcRenderer.send('preference.open')}
            >
              <img
                className="SearchMenu__Icon"
                src={settingIcon}
                alt=""
              />
              {text.setting}
            </button>
          </li>
          <li className="SearchMenu__Item">
            <button
              className="SearchMenu__Btn"
              data-test-id="menu-quit"
              type="button"
              onClick={onQuitApp}
            >
              <img
                className="SearchMenu__Icon"
                src={outIcon}
                alt=""
              />
              {text.quit}
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
