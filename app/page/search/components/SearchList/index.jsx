import React from 'react';
import PropTypes from 'prop-types';
import SearchItem from '../SearchItem';
import './SearchList.scss';

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line no-unused-prop-types
};

const defaultProps = {
  list: [],
};

class SearchList extends React.Component {
  render() {
    const { list } = this.props;

    return (
      <ul className="SearchList">
        {list.map(item => <SearchItem key={item.id} item={item} />)}
      </ul>
    );
  }
}

SearchList.propTypes = propTypes;
SearchList.defaultProps = defaultProps;

export default SearchList;
