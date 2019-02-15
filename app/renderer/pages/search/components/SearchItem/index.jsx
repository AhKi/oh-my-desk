import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Svg from 'react-svg-inline';
import ToggleButton from 'renderer/components/ToggleButton';
import starIcon from 'assets/search-view_icon/icon_star-fill.svg';
import moreIcon from 'assets/search-view_icon/icon_more.svg';
import HighlightParagraph from 'renderer/components/HighlightParagraph';
import DeleteWidgetOnSearch from '../../containers/DeleteWidgetOnSearch';
import SearchMoreMenu from '../SearchMoreMenu';
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
  onModalOpen: PropTypes.func,
  onShowWidget: PropTypes.func,
  onUpdateInfo: PropTypes.func,
};
const defaultProps = {
  isSelect: false,
  item: {},
  keyword: '',
  onCloseWidget() {},
  onModalOpen() {},
  onShowWidget() {},
  onUpdateInfo() {},
};

class SearchItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMoreMenu: false,
    };
    this.handleEditWidget = this.handleEditWidget.bind(this);
    this.handleFocusWidget = this.handleFocusWidget.bind(this);
    this.handleToggleWidget = this.handleToggleWidget.bind(this);
    this.handleToggleFavorites = this.handleToggleFavorites.bind(this);
    this.handleToggleMoreMenu = this.handleToggleMoreMenu.bind(this);
    this.handleOpenWidget = this.handleOpenWidget.bind(this);
  }

  handleFocusWidget(e) {
    const { item, onShowWidget } = this.props;

    if (item.isOpen) {
      e.preventDefault();
      onShowWidget(item.id);
    }
  }

  handleToggleMoreMenu() {
    this.setState(prevState => ({
      isMoreMenu: !prevState.isMoreMenu,
    }));
  }

  handleToggleWidget() {
    const { item, onCloseWidget, onShowWidget } = this.props;

    if (item.isOpen) {
      onCloseWidget(item.id);
    } else {
      onShowWidget(item.id);
    }
  }

  handleEditWidget() {
    const { item, onShowWidget, onUpdateInfo } = this.props;

    onShowWidget(item.id);
    onUpdateInfo(item.id, { isEditProgress: true });
  }

  handleOpenWidget() {
    const { item, onShowWidget } = this.props;

    onShowWidget(item.id);
  }

  handleToggleFavorites() {
    const { item, onUpdateInfo } = this.props;

    onUpdateInfo(item.id, { favorites: !item.favorites });
  }

  render() {
    const { isMoreMenu } = this.state;
    const {
      keyword,
      item,
      isSelect,
      onModalOpen,
    } = this.props;
    const SearchItemClassName = cx('SearchItem', {
      SearchItem__select: isSelect,
    });
    const BookmarkClassName = cx('SearchItem__icon', {
      'SearchItem__icon--select': item.favorites,
    });

    return (
      <li className={SearchItemClassName}>
        <div className="SearchItem__namebox">
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
              onDoubleClick={this.handleOpenWidget}
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
        </div>
        <div className="SearchItem__BtnSet">
          <button
            className="SearchItem__bookmark-btn"
            type="button"
            onClick={this.handleToggleFavorites}
          >
            <Svg className={BookmarkClassName} svg={starIcon} />
          </button>
          <div className="SearchMoreMenu__boxSet">
            <button
              className="SearchItem__more-btn"
              type="button"
              onClick={this.handleToggleMoreMenu}
            >
              <Svg svg={moreIcon} />
            </button>
            {isMoreMenu && (
              <SearchMoreMenu
                onEditWidget={this.handleEditWidget}
                onDeleteWidget={() => onModalOpen(DeleteWidgetOnSearch, {
                  id: item.id,
                })}
                onToggleMenu={this.handleToggleMoreMenu}
              />
            )}
          </div>
        </div>
      </li>
    );
  }
}

SearchItem.propTypes = propTypes;
SearchItem.defaultProps = defaultProps;

export default SearchItem;
