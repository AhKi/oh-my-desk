import React from 'react';
import PropTypes from 'prop-types';
import deleteWidget from 'utils/deleteWidget';
import './DeleteConfirmWidget.scss';

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onClose: PropTypes.func,
};

const defaultProps = {
  id: '',
  name: '',
  onClose() {},
};

class DeleteConfirmWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteWidget = this.handleDeleteWidget.bind(this);
  }

  handleDeleteWidget() {
    deleteWidget(this.props.id);
    this.props.onClose();
  }

  render() {
    const { name, onClose } = this.props;

    return (
      <div className="DeleteConfirmWidget">
        <h6 className="DeleteConfirmWidget__title space-2x">Confirm delete</h6>
        <span className="DeleteConfirmWidget__content space-4x">
          Do you want delete <b>{'"'}{name}{'"'}</b> widget?
        </span>
        <div className="DeleteConfirmWidget__btn-box">
          <button
            className="Btn Btn--gray Btn--sm"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="Btn Btn--primary Btn--sm"
            type="button"
            onClick={this.handleDeleteWidget}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

DeleteConfirmWidget.propTypes = propTypes;
DeleteConfirmWidget.defaultProps = defaultProps;

export default DeleteConfirmWidget;
