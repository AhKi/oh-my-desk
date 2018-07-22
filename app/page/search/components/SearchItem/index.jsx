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
};
const defaultProps = {
  item: {},
};

class SearchItem extends React.Component {
  render() {
    const { item } = this.props;

    return (
      <li className="SearchItem">
        <ToggleButton
          isCheck={item.isOpen}
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
