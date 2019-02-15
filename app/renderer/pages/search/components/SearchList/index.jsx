import React from 'react';
import PropTypes from 'prop-types';
import EmptyIcon from 'assets/search-view_icon/icon_no-page.png';
import NoresearchIcon from 'assets/search-view_icon/icon_no-research.png';
import i18n from 'constants/i18n';
import SearchItem from '../SearchItem';
import './SearchList.scss';

const propTypes = {
  keyword: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line no-unused-prop-types
  selectedIndex: PropTypes.number,
  onCloseWidget: PropTypes.func,
  onMakeWidget: PropTypes.func,
  onModalOpen: PropTypes.func,
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
  onMakeWidget() {},
  onModalOpen() {},
  onSelectIncrease() {},
  onSelectDecrease() {},
  onShowWidget() {},
  onUpdateInfo() {},
};

class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyboardEvent = this.handleKeyboardEvent.bind(this);
    this.listRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboardEvent);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      this.listRef.current.scrollTop = snapshot;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyboardEvent);
  }

  getSnapshotBeforeUpdate() {
    const { list, selectedIndex } = this.props;
    const ref = this.listRef.current;
    const { scrollHeight } = ref; // whole scroll height
    const listHeight = ref.clientHeight; // list height that see in view
    const currentTop = ref.scrollTop;
    const currentBottom = ref.scrollTop + listHeight;
    const eachHeight = scrollHeight / list.length;

    const selectedTop = eachHeight * selectedIndex;

    if (currentTop > selectedTop || scrollHeight - selectedTop <= eachHeight) {
      return selectedTop;
    }

    if (currentBottom < selectedTop) {
      return currentTop + eachHeight;
    }

    return null;
  }

  handleKeyboardEvent(e) {
    const {
      list,
      selectedIndex,
      onShowWidget,
      onSelectIncrease,
      onSelectDecrease,
    } = this.props;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      onSelectDecrease();
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      onSelectIncrease();
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      onShowWidget(list[selectedIndex].id, true);
    }
  }

  render() {
    const text = i18n().search;
    const {
      keyword,
      list,
      selectedIndex,
      onCloseWidget,
      onMakeWidget,
      onModalOpen,
      onShowWidget,
      onUpdateInfo,
    } = this.props;

    return (
      <ul className="SearchList" ref={this.listRef}>
        {list.map(item => (
          <SearchItem
            isSelect={list[selectedIndex].id === item.id}
            key={item.id}
            keyword={keyword}
            item={item}
            onCloseWidget={onCloseWidget}
            onModalOpen={onModalOpen}
            onShowWidget={onShowWidget}
            onUpdateInfo={onUpdateInfo}
          />
        ))}
        {(list.length === 0 && keyword) && (
          <div className="SearchList__no-research-img">
            <img
              src={NoresearchIcon}
              alt="no research"
            />
            {text.noSearch}
          </div>
        )}
        {(list.length === 0 && !keyword) && (
          <div className="SearchList__no-research-img">
            <img
              src={EmptyIcon}
              alt="empty"
            />
            {text.empty}
            <button
              className="Btn Btn--primary SearchList__no-page-btn"
              type="button"
              onClick={() => onMakeWidget()}
            >
              {text.firstWidget}
            </button>
          </div>
        )}
      </ul>
    );
  }
}

SearchList.propTypes = propTypes;
SearchList.defaultProps = defaultProps;

export default SearchList;
