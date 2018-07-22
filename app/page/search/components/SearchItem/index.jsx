import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'page/Components/ToggleButton';
import deleteIcon from 'assets/icon/icon-delete.svg';
import starIcon from 'assets/icon/icon-more.svg';
import './SearchItem.scss';

const propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  onCloseWidget: PropTypes.func,
  onShowWidget: PropTypes.func,
};
const defaultProps = {
  item: {},
  onCloseWidget() {},
  onShowWidget() {},
};

class SearchItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleWidget = this.handleToggleWidget.bind(this);
  }

  handleToggleWidget() {
    const { item, onCloseWidget, onShowWidget } = this.props;

    if (item.isOpen) {
      onCloseWidget(item.id);
    } else {
      onShowWidget(item.id);
    }
  }

  render() {
    const { item } = this.props;

    return (
      <li className="SearchItem">
        <ToggleButton
          isCheck={item.isOpen}
          onToggle={this.handleToggleWidget}
        />
        <p className="SearchItem__Text">
          <span><strong>{item.name}</strong></span>
          <span>{item.url}</span>
        </p>
        <p className="SearchItem__BtnSet">
          <button type="button">
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
