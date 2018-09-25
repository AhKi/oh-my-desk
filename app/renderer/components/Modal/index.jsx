import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ReactModal from 'react-modal';
import OutsideClickHandler from 'renderer/components/OutsideClickHandler';
import UrlInvalidNotificationContainer from 'renderer/pages/webview/containers/UrlInvalidNotificationContainer';
import './Modal.scss';

const propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  modalProps: PropTypes.object, // eslint-disable-line
  onModalClose: PropTypes.func,
};

const defaultProps = {
  Component() {},
  modalProps: {},
  onModalClose() {},
};

const MODAL_CONTENT = {
  URL_INVALID_NOTIFICATION: UrlInvalidNotificationContainer,
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

    if (!isOpen) {
      return null;
    }

    /**
     * When open modal in remote process, action is dispatched another process.
     * Then, Electron doesn't transfer about function parameter.
     * So, solve it for transfer string of Modal Type.
     * @type {Modal.props.Component}
     */
    const Content = typeof Component === 'string' ? MODAL_CONTENT[Component] : Component;
    console.log(Content);

    const modalClassName = cx(modalClass, {
      Modal__container: !modalClass,
    });
    const overlayClassName = cx(overlayClass, {
      Modal__overlay: !overlayClass,
    });

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
            <Content {...modalProps} onModalClose={onModalClose} />
          </OutsideClickHandler>
        ) :
          <Content {...modalProps} onModalClose={onModalClose} />
        }
      </ReactModal>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
