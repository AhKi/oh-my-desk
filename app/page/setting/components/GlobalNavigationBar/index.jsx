import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import logo from 'assets/logo/logo-white.svg';
import goArrow from 'assets/icon/icon-menu-arrow.svg';
import widgetIcon from 'assets/icon/icon-menu-widjet.svg';
import settingIcon from 'assets/icon/icon-menu-setting.svg';
import storeIcon from 'assets/icon/icon-menu-shopping.svg';
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
        icon: widgetIcon,
        path: '/widget-list',
        name: <span className="GlobalNavigationBar__list-text">Widget</span>,
        match: ['/widget-list', '/widget-setting'],
        onClick: this.props.onListClick,
      },
      {
        icon: settingIcon,
        path: '/setting',
        name: <span className="GlobalNavigationBar__list-text">Setting</span>,
        onClick: this.props.onSettingClick,
      },
      {
        icon: storeIcon,
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
          {menu.map(v => (
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
                  <img
                    className={iconClassName(match.path, v.match || v.path)}
                    src={v.icon}
                    alt=""
                  />
                  {v.name}
                  <img
                    src={goArrow}
                    alt="go-arrow"
                    className={arrowClassName(match.path, v.match || v.path)}
                  />
                </button>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

GlobalNavigationBar.propTypes = propTypes;
GlobalNavigationBar.defaultProps = defaultProps;

export default GlobalNavigationBar;
