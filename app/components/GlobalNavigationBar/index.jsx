import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
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
    const menu = [
      {
        icon: '',
        path: '/widget-list',
        name: 'Widget',
        match: ['/widget-list', '/widget-setting'],
        onClick: this.props.onListClick,
      },
      {
        icon: '',
        path: '/setting',
        name: 'Setting',
        onClick: this.props.onSettingClick,
      },
      {
        icon: '',
        path: '/widget-store',
        name: 'Widget store',
        onClick: this.props.onStoreClick,
      },
    ];

    return (
      <div className="GlobalNavigationBar">
        <div className="GlobalNavigationBar__title">
          OhMyDesk
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
                  {v.name}
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
