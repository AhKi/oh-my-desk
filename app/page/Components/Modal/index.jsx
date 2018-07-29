import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import './Modal.scss';

const propTypes = {
  Component: PropTypes.func,
  modalProps: PropTypes.object, // eslint-disable-line
  onModalClose: PropTypes.func,
};

const defaultProps = {
  Component() {},
  modalProps: {},
  onModalClose() {},
};

class Modal extends React.Component {
  render() {
    const {
      Component,
      modalProps,
      onModalClose,
    } = this.props;
    const isOpen = !!Component;

    if (!isOpen) {
      return null;
    }

    return (
      <ReactModal
        className="Modal__container"
        overlayClassName="Modal__overlay"
        contentLabel="Modal"
        isOpen={isOpen}
        ariaHideApp={false}
      >
        <Component {...modalProps} onModalClose={onModalClose} />
      </ReactModal>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
