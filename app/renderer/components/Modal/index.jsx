import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ReactModal from 'react-modal';
import OutsideClickHandler from 'renderer/components/OutsideClickHandler';
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
    const {
      modalClass,
      overlayClass,
      activeOutsideClose,
    } = modalProps;

    const modalClassName = cx(modalClass, {
      Modal__container: !modalClass,
    });
    const overlayClassName = cx(overlayClass, {
      Modal__overlay: !overlayClass,
    });

    if (!isOpen) {
      return null;
    }

    return (
      <ReactModal
        className={modalClassName}
        overlayClassName={overlayClassName}
        contentLabel="Modal"
        isOpen={isOpen}
        ariaHideApp={false}
      >
        {activeOutsideClose ? (
          <OutsideClickHandler onOutSideClick={onModalClose}>
            <Component {...modalProps} onModalClose={onModalClose} />
          </OutsideClickHandler>
        ) :
          <Component {...modalProps} onModalClose={onModalClose} />
        }
      </ReactModal>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
