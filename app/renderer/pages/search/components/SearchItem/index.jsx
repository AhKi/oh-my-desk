import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ToggleButton from 'renderer/components/ToggleButton';
import starIcon from 'assets/search-view_icon/icon_star-fill.svg';
import moreIcon from 'assets/search-view_icon/icon_more.svg';
import HighlightParagraph from 'renderer/components/HighlightParagraph';
import './SearchItem.scss';

const propTypes = {
  isSelect: PropTypes.bool,
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    searched: PropTypes.string,
  }),
  keyword: PropTypes.string,
  onCloseWidget: PropTypes.func,
  onShowWidget: PropTypes.func,
  onUpdateInfo: PropTypes.func,
};
const defaultProps = {
  isSelect: false,
  item: {},
  keyword: '',
  onCloseWidget() {},
  onShowWidget() {},
  onUpdateInfo() {},
};

class SearchItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleFocusWidget = this.handleFocusWidget.bind(this);
    this.handleToggleWidget = this.handleToggleWidget.bind(this);
    this.handleToggleFavorites = this.handleToggleFavorites.bind(this);
  }

  handleFocusWidget(e) {
    const { item, onShowWidget } = this.props;

    if (item.isOpen) {
      e.preventDefault();
      onShowWidget(item.id);
    }
  }

  handleToggleWidget() {
    const { item, onCloseWidget, onShowWidget } = this.props;

    if (item.isOpen) {
      onCloseWidget(item.id);
    } else {
      onShowWidget(item.id);
    }
  }

  handleToggleFavorites() {
    const { item, onUpdateInfo } = this.props;

    onUpdateInfo(item.id, { favorites: !item.favorites });
  }

  render() {
    const { keyword, item, isSelect } = this.props;
    const SearchItemClassName = cx('SearchItem', {
      SearchItem__select: isSelect,
    });
    const BookmarkClassName = cx('SearchItem__icon', {
      'SearchItem__icon--select': item.favorites,
    });

    return (
      <li className={SearchItemClassName}>
        <div className="SearchItem__toggle-btn">
          <ToggleButton
            isCheck={item.isOpen}
            onToggle={this.handleToggleWidget}
          />
        </div>
        <p className="SearchItem__Text">
          <button
            className="SearchItem__Btn"
            type="button"
            onClick={this.handleFocusWidget}
          >
            <strong className="SearchItem__title-text">
              {(item.searched === 'both' || item.searched === 'name') ? (
                <HighlightParagraph
                  keyword={keyword}
                  content={item.name}
                />
              ) : <span>{item.name}</span>}
            </strong>
            <span className="SearchItem__url-text">
              {(item.searched === 'both' || item.searched === 'url') ? (
                <HighlightParagraph
                  keyword={keyword}
                  content={item.url}
                />
              ) : <span>{item.url}</span>}
            </span>
          </button>
        </p>
        <p className="SearchItem__BtnSet">
          <button
            className="SearchItem__bookmark-btn"
            type="button"
            onClick={this.handleToggleFavorites}
          >
            <img className={BookmarkClassName} src={starIcon} alt="" />
          </button>
          <button
            className="SearchItem__more-btn"
            type="button"
          >
            <img src={moreIcon} alt="" />
          </button>
        </p>
      </li>
    );
  }
}

SearchItem.propTypes = propTypes;
SearchItem.defaultProps = defaultProps;

export default SearchItem;
