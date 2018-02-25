import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import logo from 'assets/logo/logo-white.svg';
import WidgetIcon from 'assets/icon/icon-menu-widget';
import StoreIcon from 'assets/icon/icon-menu-store';
import SettingIcon from 'assets/icon/icon-menu-setting';
import ArrowIcon from 'assets/icon/icon-menu-arrow';
import './GlobalNavigationBar.scss';

const propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
  onListClick: PropTypes.func,
  onSettingClick: PropTypes.func,
  onStoreClick: PropTypes.func,
};

const defaultProps = {
  match: {},
  onListClick() {},
  onSettingClick() {},
  onStoreClick() {},
};

class GlobalNavigationBar extends React.Component {
  static calculateIsActive(current, target) {
    let isActive;

    if (typeof target === 'string') {
      isActive = current === target;
    } else if (Array.isArray(target)) {
      isActive = target.indexOf(current) !== -1;
    } else {
      isActive = false;
    }

    return isActive;
  }

  static listClassName(current, target) {
    let isActive;

    if (typeof target === 'string') {
      isActive = current === target;
    } else if (Array.isArray(target)) {
      isActive = target.indexOf(current) !== -1;
    } else {
      isActive = false;
    }

    return cx(
      'GlobalNavigationBar__list',
      {
        'GlobalNavigationBar__list-active': isActive,
      },
    );
  }

  render() {
    const { match } = this.props;
    const iconClassName = (current, target) => cx('GlobalNavigationBar__list-icon', {
      'GlobalNavigationBar__list-icon--active': GlobalNavigationBar.calculateIsActive(current, target),
    });
    const arrowClassName = (current, target) => cx('GlobalNavigationBar__list-arrow', {
      'GlobalNavigationBar__list-arrow--active': GlobalNavigationBar.calculateIsActive(current, target),
    });
    const menu = [
      {
        icon: WidgetIcon,
        path: '/widget-list',
        name: <span className="GlobalNavigationBar__list-text">Widget</span>,
        match: ['/widget-list', '/widget-setting'],
        onClick: this.props.onListClick,
      },
      {
        icon: SettingIcon,
        path: '/setting',
        name: <span className="GlobalNavigationBar__list-text">Setting</span>,
        onClick: this.props.onSettingClick,
      },
      {
        icon: StoreIcon,
        path: '/widget-store',
        name: <span className="GlobalNavigationBar__list-text">Store</span>,
        onClick: this.props.onStoreClick,
      },
    ];

    return (
      <div className="GlobalNavigationBar">
        <div className="GlobalNavigationBar__title">
          <img src={logo} alt="white-logo" className="GlobalNavigationBar__logo" />
        </div>
        <ul className="GlobalNavigationBar__menu-box">
          {menu.map((v) => {
            const Icon = v.icon;

            return (
              <Link to={v.path} key={v.path}>
                <li className={GlobalNavigationBar.listClassName(
                  this.props.match.path,
                  v.match || v.path,
                )}
                >
                  <button
                    className="GlobalNavigationBar__list-btn"
                    type="button"
                    onClick={v.onClick}
                  >
                    <Icon
                      className={iconClassName(match.path, v.match || v.path)}
                    />
                    <img
                      src={v.icon}
                      alt=""
                    />
                    {v.name}
                    <ArrowIcon
                      className={arrowClassName(match.path, v.match || v.path)}
                    />
                  </button>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

GlobalNavigationBar.propTypes = propTypes;
GlobalNavigationBar.defaultProps = defaultProps;

export default GlobalNavigationBar;
