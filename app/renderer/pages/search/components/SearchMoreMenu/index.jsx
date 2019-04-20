import React from 'react';
import PropTypes from 'prop-types';
import Svg from 'react-svg-inline';
import EditIcon from 'assets/icon/icon-edit.svg';
import DeleteIcon from 'assets/icon/icon-delete.svg';
import i18n from 'constants/i18n';

const propTypes = {
  onEditWidget: PropTypes.func.isRequired,
  onDeleteWidget: PropTypes.func.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
};
const defaultProps = {};

class SearchMoreMenu extends React.Component {
  componentDidMount() {
    document.addEventListener('click', this.props.onToggleMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.props.onToggleMenu);
  }
  render() {
    const text = i18n().search;
    const {
      onEditWidget,
      onDeleteWidget,
    } = this.props;

    return (
      <ul className="SearchMoreMenu">
        <li className="SearchMoreMenu__btnSet">
          <button
            type="button"
            onClick={onEditWidget}
            className="SearchMoreMenu__btn"
          >
            <div>{text.moreEdit}</div>
            <Svg svg={EditIcon} />
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={onDeleteWidget}
            className="SearchMoreMenu__btn"
          >
            {text.moreRemove}
            <Svg svg={DeleteIcon} />
          </button>
        </li>
      </ul>
    );
  }
}

SearchMoreMenu.propTypes = propTypes;
SearchMoreMenu.defaultProps = defaultProps;

export default SearchMoreMenu;
