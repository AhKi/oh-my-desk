import React from 'react';
import PropTypes from 'prop-types';
import SearchItem from '../SearchItem';
import './SearchList.scss';

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line no-unused-prop-types
  keyword: PropTypes.string,
  onCloseWidget: PropTypes.func,
  onShowWidget: PropTypes.func,
  onUpdateInfo: PropTypes.func,
};

const defaultProps = {
  list: [],
  keyword: '',
  onCloseWidget() {},
  onShowWidget() {},
  onUpdateInfo() {},
};

class SearchList extends React.Component {
  render() {
    const {
      keyword,
      list,
      onCloseWidget,
      onShowWidget,
      onUpdateInfo,
    } = this.props;

    return (
      <ul className="SearchList">
        {list.map(item => (
          <SearchItem
            key={item.id}
            keyword={keyword}
            item={item}
            onCloseWidget={onCloseWidget}
            onShowWidget={onShowWidget}
            onUpdateInfo={onUpdateInfo}
          />
        ))}
      </ul>
    );
  }
}

SearchList.propTypes = propTypes;
SearchList.defaultProps = defaultProps;

export default SearchList;
