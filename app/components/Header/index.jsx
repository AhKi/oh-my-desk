import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

const propTypes = {
  children: PropTypes.element,
};

const defaultProps = {
  children: null,
};

function Header(props) {
  return (
    <div className="Header">
      {props.children}
    </div>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
