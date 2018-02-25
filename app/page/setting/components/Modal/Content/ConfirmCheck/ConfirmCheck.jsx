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
  cancelText: 'cancel',
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
        <h6 className="ConfirmCheck__title space-2x"><strong>{title}</strong></h6>
        <span
          className="ConfirmCheck__content space-4x"
        >
          {content.split('\n').map((line, index) => (
            <span key={index}>{line}<br /></span> // eslint-disable-line react/no-array-index-key
          ))}
        </span>
        <div className="ConfirmCheck__btn-box">
          <button
            type="button"
            className="Btn Btn--gray Btn--sm"
            onClick={onModalClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="Btn Btn--primary Btn--sm ConfirmCheck__btn"
            onClick={this.handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    );
  }
}

ConfirmCheck.propTypes = propTypes;
ConfirmCheck.defaultProps = defaultProps;

export default ConfirmCheck;
