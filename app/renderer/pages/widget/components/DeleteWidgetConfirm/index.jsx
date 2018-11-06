import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'constants/i18n';
import './DeleteWidgetConfirm.scss';

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
      <div className="DeleteWidgetConfirm__container">
        <h5>{text.deleteWidget}</h5>
        <p className="DeleteWidgetConfirm__content">{text.deleteCheck}</p>
        <div className="DeleteWidgetConfirm__btn-set">
          <button
            className="Btn Btn--sm Btn--gray"
            type="button"
            onClick={onModalClose}
          >
            {text.cancel}
          </button>
          <button
            className="Btn Btn--sm Btn--primary"
            type="button"
            onClick={this.handleDelete}
          >
            {text.ok}
          </button>
        </div>
      </div>
    );
  }
}

DeleteWidgetConfirm.propTypes = propTypes;
DeleteWidgetConfirm.defaultProps = defaultProps;

export default DeleteWidgetConfirm;
