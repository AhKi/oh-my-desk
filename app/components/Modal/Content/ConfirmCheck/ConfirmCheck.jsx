import React from 'react';
import PropTypes from 'prop-types';
import './ConfirmCheck.scss';

const propTypes = {
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  onConfirm: PropTypes.func,
  onModalClose: PropTypes.func,
};
const defaultProps = {
  cancelText: 'close',
  confirmText: 'ok',
  content: '',
  title: '',
  onConfirm() {},
  onModalClose() {},
};

class ConfirmCheck extends React.Component {
  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm(arg) {
    this.props.onConfirm(arg);
    this.props.onModalClose();
  }

  render() {
    const {
      cancelText,
      confirmText,
      content,
      title,
      onModalClose,
    } = this.props;

    return (
      <div className="ConfirmCheck">
        <h3 className="ConfirmCheck__title">{title}</h3>
        <p className="ConfirmCheck__content">{content}</p>
        <button
          type="button"
          className="Btn Btn--primary Btn-middle"
          onClick={this.handleConfirm}
        >
          {confirmText}
        </button>
        <button
          type="button"
          className="Btn Btn--primary Btn-middle"
          onClick={onModalClose}
        >
          {cancelText}
        </button>
      </div>
    );
  }
}

ConfirmCheck.propTypes = propTypes;
ConfirmCheck.defaultProps = defaultProps;

export default ConfirmCheck;
