import React from 'react';
// import PropTypes from 'prop-types';

const propTypes = {};
const defaultProps = {};

class Widget extends React.Component {
  render() {
    return (
      <div>Widget</div>
    );
  }
}

Widget.propTypes = propTypes;
Widget.defaultProps = defaultProps;

export default Widget;
