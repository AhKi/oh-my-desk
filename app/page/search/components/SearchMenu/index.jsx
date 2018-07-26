import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import icon from 'assets/logo/logo-white.svg';
import addIcon from 'assets/icon/icon-widget-refresh.svg';
import allIcon from 'assets/icon/icon-menu-store.svg';
import favoritesIcon from 'assets/icon/icon-pin.svg';
import settingIcon from 'assets/icon/icon-menu-setting.svg';
import i18n from 'constants/i18n';
import './SearchMenu.scss';

const propTypes = {
  filter: PropTypes.string,
  onSetFilter: PropTypes.func,
  onOpenPreference: PropTypes.func,
};
const defaultProps = {
  filter: 'ALL',
  onSetFilter() {},
  onOpenPreference() {},
};

class SearchMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetAllFilter = this.handleSetAllFilter.bind(this);
    this.handleSetFavoritesFilter = this.handleSetFavoritesFilter.bind(this);
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
    const { filter, onOpenPreference } = this.props;
    const allMenuClassName = cx('SearchMenu__Item', {
      'SearchMenu__Item--active': filter === 'ALL',
    });
    const favoritesMenuClassName = cx('SearchMenu__Item', {
      'SearchMenu__Item--active': filter === 'FAVORITES',
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
          <li className={allMenuClassName}>
            <button
              className="SearchMenu__Btn"
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
          <li className={favoritesMenuClassName}>
            <button
              className="SearchMenu__Btn"
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
              type="button"
              onClick={onOpenPreference}
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
