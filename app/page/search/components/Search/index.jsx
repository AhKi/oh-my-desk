import React from 'react';
// import PropTypes from 'prop-types';
import SearchMenu from '../SearchMenu';
import './Search.scss';

const propTypes = {};
const defaultProps = {};

class Search extends React.Component {
  render() {
    return (
      <div className="Search">
        <SearchMenu />
      </div>
    );
  }
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
