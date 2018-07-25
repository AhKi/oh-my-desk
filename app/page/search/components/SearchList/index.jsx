import React from 'react';
import PropTypes from 'prop-types';
import SearchItem from '../SearchItem';
import './SearchList.scss';

const propTypes = {
  keyword: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line no-unused-prop-types
  selectedIndex: PropTypes.number,
  onCloseWidget: PropTypes.func,
  onSelectIncrease: PropTypes.func,
  onSelectDecrease: PropTypes.func,
  onShowWidget: PropTypes.func,
  onUpdateInfo: PropTypes.func,
};

const defaultProps = {
  selectedIndex: 0,
  list: [],
  keyword: '',
  onCloseWidget() {},
  onSelectIncrease() {},
  onSelectDecrease() {},
  onShowWidget() {},
  onUpdateInfo() {},
};

class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyboardEvent = this.handleKeyboardEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboardEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboardEvent);
  }

  handleKeyboardEvent(e) {
    const { onSelectIncrease, onSelectDecrease } = this.props;

    if (e.key === 'ArrowUp') {
      onSelectDecrease();
    }

    if (e.key === 'ArrowDown') {
      onSelectIncrease();
    }
  }

  render() {
    const {
      keyword,
      list,
      selectedIndex,
      onCloseWidget,
      onShowWidget,
      onUpdateInfo,
    } = this.props;

    return (
      <ul className="SearchList">
        {list.map(item => (
          <SearchItem
            isSelect={list[selectedIndex].id === item.id}
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
