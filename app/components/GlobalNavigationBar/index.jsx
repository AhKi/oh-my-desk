import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import './GlobalNavigationBar.scss';

const propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
};

const defaultProps = {
  match: {},
};

const listClassName = (current, target) => cx(
  'list-group-item',
  'list-group-item-action',
  'GlobalNavigationBar__list',
  {
    active: current === target,
  },
);

class GlobalNavigationBar extends React.Component {
  render() {
    const menu = [
      {
        path: '/setting',
        name: 'Setting',
      },
      {
        path: '/widget-list',
        name: 'Widget',
      },
      {
        path: '/widget-store',
        name: 'Widget store',
      },
    ];

    return (
      <div className="GlobalNavigationBar">
        <ul className="list-group">
          {menu.map(v => (
            <Link className="GlobalNavigationBar__link" to={v.path} key={v.path}>
              <li className={listClassName(this.props.match.path, v.path)}>{v.name}</li>
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
