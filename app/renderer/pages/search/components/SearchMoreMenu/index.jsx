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
      <ul>
        <li>
          <button
            type="button"
            onClick={onEditWidget}
          >
            <Svg svg={EditIcon} />
            {text.edit}
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={onDeleteWidget}
          >
            <Svg svg={DeleteIcon} />
            {text.delete}
          </button>
        </li>
      </ul>
    );
  }
}

SearchMoreMenu.propTypes = propTypes;
SearchMoreMenu.defaultProps = defaultProps;

export default SearchMoreMenu;
