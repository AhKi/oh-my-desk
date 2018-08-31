import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'constants/i18n';

const propTypes = {
  id: PropTypes.string,
  onDelete: PropTypes.func,
  onModalClose: PropTypes.func,
};
const defaultProps = {
  id: '',
  onDelete() {},
  onModalClose() {},
};

class DeleteWidgetConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { id, onDelete, onModalClose } = this.props;

    onDelete(id);
    onModalClose();
  }

  render() {
    const { onModalClose } = this.props;
    const text = i18n().widget;

    return (
      <div>
        <h3>{text.deleteWidget}</h3>
        <p>{text.deleteCheck}</p>
        <button
          type="button"
          onClick={onModalClose}
        >
          {text.cancel}
        </button>
        <button
          type="button"
          onClick={this.handleDelete}
        >
          {text.ok}
        </button>
      </div>
    );
  }
}

DeleteWidgetConfirm.propTypes = propTypes;
DeleteWidgetConfirm.defaultProps = defaultProps;

export default DeleteWidgetConfirm;
