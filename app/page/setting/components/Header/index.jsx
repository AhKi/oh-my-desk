import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
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
