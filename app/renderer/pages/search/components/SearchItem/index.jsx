import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ToggleButton from 'renderer/components/ToggleButton/index';
import deleteIcon from 'assets/icon/icon-delete.svg';
import starIcon from 'assets/icon/icon-more.svg';
import HighlightParagraph from 'renderer/components/HighlightParagraph/index';
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
    this.handleToggleWidget = this.handleToggleWidget.bind(this);
    this.handleToggleFavorites = this.handleToggleFavorites.bind(this);
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

    return (
      <li className={SearchItemClassName}>
        <ToggleButton
          isCheck={item.isOpen}
          onToggle={this.handleToggleWidget}
        />
        <p className="SearchItem__Text">
          <strong>
            {(item.searched === 'both' || item.searched === 'name') ? (
              <HighlightParagraph
                keyword={keyword}
                content={item.name}
              />
            ) : <span>{item.name}</span>}
          </strong>
          <span>
            {(item.searched === 'both' || item.searched === 'url') ? (
              <HighlightParagraph
                keyword={keyword}
                content={item.url}
              />
            ) : <span>{item.url}</span>}
          </span>
        </p>
        <p className="SearchItem__BtnSet">
          <button
            type="button"
            onClick={this.handleToggleFavorites}
          >
            <img src={starIcon} alt="" />
          </button>
          <button type="button">
            <img src={deleteIcon} alt="" />
          </button>
        </p>
      </li>
    );
  }
}

SearchItem.propTypes = propTypes;
SearchItem.defaultProps = defaultProps;

export default SearchItem;
